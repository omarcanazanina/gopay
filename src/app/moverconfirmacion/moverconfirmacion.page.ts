import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-moverconfirmacion',
  templateUrl: './moverconfirmacion.page.html',
  styleUrls: ['./moverconfirmacion.page.scss'],
})
export class MoverconfirmacionPage implements OnInit {
  @ViewChild('focus',{static:true}) myInput;
  recuperado1 = null
  recuperado2 = null
  cadena1: string
  cadena2: string
  uu: any
  fecha: Date;
  fechita: any
  usuario = {
    cajainterna: "",
    nombre: "",
    cajabancaria: "",
    uid: ""
  }
  cajaapp = {
    monto: "",
    uid: ""
  }
  cajaapp1:number
  cajaapp2:any
  monto: any
  total: number
  total1:any
  tarjeta1: any
  tarjeta2: any
  totalresta: number
  totalresta1:any
  constructor(private activatedRoute: ActivatedRoute,
    private au: AuthService,
    private route: Router,
    public fire: AngularFirestore) { }

  ngOnInit() {
    this.fecha = new Date();
    const mes = this.fecha.getMonth() + 1;
    this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();

    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
    })
    this.recuperado1 = this.activatedRoute.snapshot.paramMap.get('dato1');
    this.recuperado2 = this.activatedRoute.snapshot.paramMap.get('dato2');
    if (this.recuperado1.length > 16) {
      this.cadena1 = "****" + this.recuperado1.substring(21, 25)
    } else {
      this.cadena1 = "Balance"
    }
    if (this.recuperado2.length > 16) {
      this.cadena2 = "****" + this.recuperado2.substring(21, 25)
    } else {
      this.cadena2 = "Balance"
    }
    setTimeout(() => {
      this.myInput.setFocus();
    }, 150)
    this.au.recuperacajaapp().subscribe(cajaapp => {
      this.cajaapp = cajaapp;
    })
    this.au.recupera1tarjeta(this.recuperado1, this.uu).subscribe(datito => {
      this.tarjeta1 = datito[0];
    })
    this.au.recupera1tarjeta(this.recuperado2, this.uu).subscribe(datito => {
      this.tarjeta2 = datito[0];
    })
  }

  mover() {
    if (this.monto <= 0 || this.monto == undefined || this.monto == null) {
      this.au.ingresoinvalido()
    } else {
      if (this.cadena2 == "Balance") {
        this.total = parseFloat(this.usuario.cajainterna) + this.monto;
        this.total1 =this.total.toFixed(2)
        this.au.actualizacaja({ cajainterna: this.total1 }, this.usuario.uid);
        this.cajaapp1 =parseFloat(this.cajaapp.monto) + this.monto
        this.cajaapp2 = this.cajaapp1.toFixed(2)
        this.au.actualizacajaapp({ monto: this.cajaapp2 })
        this.fire.collection('/user/' + this.usuario.uid + '/ingresos').add({
          nombre: this.cadena1,
          monto: this.monto,
          numero: this.tarjeta1.numero,
          fechita: this.fechita,
          fecha: this.fecha,
          descripcion: 'transferencia por tarjeta',
          saldo: this.total1,
          identificador: '1'
        })
        this.route.navigate(['/tabs/tab2'])
        this.au.transexitoso();
      } else {
        if (this.cadena1 == "Balance") {
          if (this.usuario.cajainterna >= this.monto) {
            let cajaappmonto1 = parseFloat(this.cajaapp.monto);
            this.totalresta = parseFloat(this.usuario.cajainterna) - this.monto;
            this.totalresta1 = this.totalresta.toFixed(2)
            this.au.actualizacaja({ cajainterna: this.totalresta1 }, this.usuario.uid);
            cajaappmonto1 = cajaappmonto1 - this.monto;
            let cajaappmonto2 = cajaappmonto1.toFixed(2)
            this.au.actualizacajaapp({ monto: cajaappmonto2 })
            this.fire.collection('/user/' + this.usuario.uid + '/egreso').add({
              nombre: "****" + this.tarjeta2.numerito,
              monto: this.monto,
              fechita: this.fechita,
              fecha: this.fecha,
              descripcion: 'transferencia a tarjeta',
              saldo: this.totalresta1,
              identificador: '0'
            })
            this.fire.collection('/user/' + this.usuario.uid + '/transferencias').add({
              nombre: "****" + this.tarjeta2.numerito,
              monto: this.monto,
              fechita: this.fechita,
              fecha: this.fecha,
              descripcion: 'transferencia a tarjeta',
              saldo: this.totalresta
            })
            this.route.navigate(['/tabs/tab2'])
            this.au.transexitoso();
            //falta modificar el monto de tarjeta
            /*this.tarjeta2.monto = this.tarjeta2.monto + this.monto;
            this.au.actualizacajatarjeta({monto :this.tarjeta2.monto},this.usuario.uid)*/
          } else {
           this.au.insuficiente()
          }
        }else{
          this.route.navigate(['/tabs/tab2'])
          this.au.transexitoso();
        }
      }
    }
  }
}
