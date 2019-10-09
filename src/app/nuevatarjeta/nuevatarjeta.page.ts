import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service'
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nuevatarjeta',
  templateUrl: './nuevatarjeta.page.html',
  styleUrls: ['./nuevatarjeta.page.scss'],
})
export class NuevatarjetaPage implements OnInit {
  public mask = [/[0-9]/, /\d/, /\d/, /\d/,' ' ,'-',' ', /\d/, /\d/, /\d/, /\d/,' ', '-',' ', /\d/, /\d/, /\d/, /\d/,' ', '-',' ', /\d/, /\d/, /\d/, /\d/]
  public mask1 = [/[0-9]/, /\d/,' ', '/',' ', /\d/, /\d/]
  public mask2 = [/[0-9]/, /\d/, /\d/]
  constructor(private au: AuthService, public fire: AngularFirestore, public route: Router) { }
  uu: any;
  customPopoverOptions
  usuario = {
    uid: "",
    nombre: ""
  }
  numero: number
  vencimiento: any
  cvv: any
  pais: any
  jaja: any
  fecha:Date
  fechita:any
  ngOnInit() {

    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
    })
    this.fecha = new Date();
    const mes = this.fecha.getMonth() + 1;
    this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();
  
  }

  guardartarjeta() {
    const convertido = this.numero.toString()
    const numerito = convertido.substring(21, 25)
    this.fire.collection('/user/' + this.uu + '/tarjetas').add({
      numero: this.numero,
      numerito: numerito,
      vencimiento: this.vencimiento,
      cvv: this.cvv,
      pais: this.pais,
      monto: 0
    })
    //this.au.creotarjeta();
    console.log("se guardo correctamente");
    this.route.navigate(['/tarjetas'])
  }

}
