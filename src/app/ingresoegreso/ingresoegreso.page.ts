import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { DetalleingresoegresoPage } from '../detalleingresoegreso/detalleingresoegreso.page';
import { DetalleegresoPage } from '../detalleegreso/detalleegreso.page';
import { IonContent } from '@ionic/angular';
@Component({
  selector: 'app-ingresoegreso',
  templateUrl: './ingresoegreso.page.html',
  styleUrls: ['./ingresoegreso.page.scss'],
})
export class IngresoegresoPage implements OnInit {
  @ViewChild(IonContent,{static:true}) content: IonContent;
  uu: any;
  constructor(private au: AuthService, private router: Router, private nvctrl: NavController, public modalController: ModalController) { }
  usuario = {
    cajainterna: "",
    nombre: "",
    fecha: "",
    id: ""
  }
  movimientos
  datito: any = [];
  balance = 0;
  balance1:any
  ingreso = 0;
  ingreso1:any
  egreso = 0;
  egreso1:any
  consulta: any = [];
  nuevo: any = [];
  ordenado: any = [];
  cajareal: number
  nombre: string
  ocultara = 0
  dato1: any = []
  dato: string
  dato2:string
  cuentas: any = []
  ngOnInit() {
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
      this.cajareal = parseFloat (this.usuario.cajainterna)
      this.nombre = this.usuario.nombre
    })
  /* this.au.ordenaringresos(this.uu).subscribe(dato => {
      this.consulta = dato;
      this.ingreso = 0;
      dato.forEach(element => {
        this.ingreso = this.ingreso + element.monto
        this.ingreso1 =this.ingreso.toFixed(2)
      });
    })*/

  /*  this.au.ordenaregresos(this.uu).subscribe(datos => {
      this.datito = datos;
      this.nuevo = [].concat(this.consulta, this.datito);
      this.ordenado = this.au.ordenarjson(this.nuevo, 'fecha', 'desc')
      this.egreso = 0;
      datos.forEach(element => {
        this.egreso = this.egreso + element.monto
        this.egreso1 = this.egreso.toFixed(2)
      });
      this.balance = this.ingreso + this.egreso
     this.balance1 = this.balance.toFixed(2)
    })*/
    this.au.recuperatarjeta(this.uu).subscribe(data => {
      this.dato1 = data;
      if (this.dato1.length > 0) {
        this.dato = data[0].numerito;
      } else {
        this.dato = "a"
      }
    })
    this.au.recuperacuenta(this.uu).subscribe(datos => {
      this.cuentas = datos;
      if (this.cuentas.length > 0) {
        this.dato2 = datos[0].cuenta;
      } else {
        this.dato2 = "b"
      }
    })
  }

  /*async detalleingresoegreso(usu) {
    const modal = await this.modalController.create({
      component: DetalleingresoegresoPage,
      cssClass: 'detalleingresoegreso',
      componentProps: {
        usu: usu
      }
    });
    return await modal.present();
  }*/
  /*async detalleegreso(usu) {
    const modal = await this.modalController.create({
      component: DetalleegresoPage,
      cssClass: 'detalleegreso',
      componentProps: {
        usu: usu
      }
    });
    return await modal.present();
  }*/

 /* ocultar() {
    this.ocultara = 1
  }
  ScrollToTop() {
    this.content.scrollToTop(1500);
    this.ocultara = 0
  }*/

}
