import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-cargarsaldo',
  templateUrl: './cargarsaldo.page.html',
  styleUrls: ['./cargarsaldo.page.scss'],
})
export class CargarsaldoPage implements OnInit {
  @ViewChild('input',{static:true}) myInput;
  uu: any
  usuario = {
    cajainterna: "",
    correo: "",
    nombre: "",
    pass: "",
    telefono: "",
    cajabancaria: "",
    uid: ""
  }
  monto
  cajaapp = {
    monto: "",
    uid: ""
  }
  controlador = 0
  tarjetas: string
  tarjetas1: any = []
  dato = null
  fecha: Date
  fechita: any
  cajatotal: number
  cajatotal1: any
  caja:number
  caja1:any
  constructor(private au: AuthService,
    private activate: ActivatedRoute,
    public fire: AngularFirestore,
    public route: Router) { }
  ngOnInit() {
    setTimeout(() => {
      this.myInput.setFocus();
    }, 150)
    this.dato = this.activate.snapshot.paramMap.get('id')

    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
    })
    this.au.recuperatarjeta(this.uu).subscribe(datos => {
      this.tarjetas1 = datos;
      this.controlador = this.tarjetas1.length;
    })
    this.fecha = new Date();
    const mes = this.fecha.getMonth() + 1;
    this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();

    this.au.recuperacajaapp().subscribe(cajaapp => {
      this.cajaapp = cajaapp;
    })
  }
  cargatarjeta(monto) {
    if (monto == undefined) {
      this.au.ingresemonto()
    } else {
      this.route.navigate(['confirmacargasaldo', monto])
    }
  }
  carga(monto) {
    if (monto == undefined) {
      this.au.ingresemonto()
    } else {
      this.route.navigate(['/cargacontarjeta', monto])
    }
  }
  cargadirecto(monto) {
    if (monto == undefined) {
      this.au.ingresemonto()
    } else {
      this.caja = parseFloat(this.cajaapp.monto) + parseFloat(monto)
      this.caja1 = this.caja.toFixed(2)
      this.au.actualizacajaapp({ monto: this.caja1 })
      this.cajatotal = parseFloat(this.usuario.cajainterna) +parseFloat(monto)
      this.cajatotal1 = this.cajatotal.toFixed(2)
      this.au.actualizacaja({ cajainterna: this.cajatotal1 }, this.uu);
      this.fire.collection('/user/' + this.uu + '/ingresos').add({
        monto: monto,
        nombre: "····" + this.dato,
        fechita: this.fechita,
        fecha: this.fecha,
        descripcion: 'carga desde tarjeta',
        saldo: this.cajatotal,
        identificador: '1'
      })
      this.au.cargocontarjeta(monto,'····'+this.dato)
      this.route.navigate(['/tabs/tab2'])
    }
  }

}
