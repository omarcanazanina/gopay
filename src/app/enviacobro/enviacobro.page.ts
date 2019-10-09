import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { FcmService } from '../servicios/fcm.service';

@Component({
  selector: 'app-enviacobro',
  templateUrl: './enviacobro.page.html',
  styleUrls: ['./enviacobro.page.scss'],
})
export class EnviacobroPage implements OnInit {
  datito = [];
  elegido: any=[];
  usuario = {
    nombre: ""
  }
  usuario1 = {
    nombre: "",
    cajainterna: "",
    uid: "",
    password: "",
    telefono: "",
  }
  uu: any;
  items: any;
  contacto: any;
  monto: any;
  detalle: any;
  fecha: Date;
  fechita: any;
  datit=null

  constructor(private au: AuthService,
    public fire: AngularFirestore,
    public route: Router,
    private fcm:FcmService,
    private activatedRoute: ActivatedRoute) {
   // this.initializeItems();
  }

  ngOnInit() {
    this.datit = this.activatedRoute.snapshot.paramMap.get('id')
    this.au.recuperaundato(this.datit).subscribe(usu => {
      this.elegido = usu
      alert(JSON.stringify(this.elegido))
    })
  /*  //recupera los usuarios de firebase
    this.au.recuperadatos().subscribe(datos => {
      this.datito = datos;
    })*/
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario1 => {
      this.usuario1 = usuario1;
      alert(JSON.stringify(this.usuario1))
    })
    this.fecha = new Date();
    const mes = this.fecha.getMonth() + 1;
    this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();
  }
    /*
  initializeItems() {
    this.items = this.datito;
  }

//buscar
  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }*/
  /*
  prueba(usu) {
    console.log(usu);
    this.elegido = usu
    this.contacto = usu.nombre
    if (this.contacto == usu.nombre) {
      this.items.length = 0
    }
  }*/
  enviocobro() {
    this.fire.collection('/user/' + this.usuario1.uid + '/cobros').add({
      monto: this.monto,
      dato: 'enviado',
      clave: this.elegido.uid,
      nombre: this.elegido.nombre,
      telefono: this.elegido.telefono,
      fechita: this.fechita,
      fecha: this.fecha,
      fechapago: '',
      detalle: this.detalle,
      estado: 0
    })
    this.fire.collection('/user/' + this.elegido.uid + '/cobros').add({
      monto: this.monto,
      dato: 'recibio',
      clave: this.usuario1.uid,
      nombre: this.usuario1.nombre,
      telefono: this.usuario1.telefono,
      fechita: this.fechita,
      fecha: this.fecha,
      fechapago: '',
      detalle: this.detalle,
      estado: 0
    })
    this.au.enviocobro(this.monto, this.elegido.nombre)
    this.fcm.notificacionforToken("GoPay", "Acaba de recibir una solicitud de pago de " + this.monto + "Bs. de " + this.usuario1.nombre + " ", this.elegido.token, this.usuario1.uid, "/tabs/tab2")
    this.route.navigate(['tabs/tab2'])
  }
}
