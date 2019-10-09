import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import {LoadingController} from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Router } from '@angular/router';
import { FcmService } from '../servicios/fcm.service';
//import { firebaseConfig } from '../app.module';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
 
export class IndexPage implements OnInit {
  numero
  constructor(public db: AngularFireDatabase,
     private loadingController: LoadingController,
     private googlePlus:GooglePlus,
     private route: Router,
     private fcm: FcmService
   ) { }
  
  ngOnInit() {
  }


   //FUNCIONES DE LOGUEO PON GOOGLE
   async doGoogleLogin(){
    const loading = await this.loadingController.create({
      message: 'Espera porfavor...'
    });
    this.presentLoadin(loading);
    this.googlePlus.login({
      'scopes': '', // optional - space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': "558881935841-6u48b95j7jehggjblbt7kdm93srvchce.apps.googleusercontent.com", // optional - clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true, // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      })
      .then(user => {
        //save user data on the native storage
        loading.dismiss();
        this.route.navigate(['/password',user.displayName,user.email])
      }, err => {
        alert(JSON.stringify(err))
        loading.dismiss();
      })
  }

  async presentLoadin(loading) {
    return await loading.present();
  }

  ingreso(){
    this.route.navigate(['/nombre'])
  }
  ramdom(){
    this.route.navigate(['/confirmarnum'])
  this.numero=Math.floor(Math.random() * (999999 - 100000 ) + 1);
   console.log('este es el ramdom'+' '+this.numero);
  }

  sms(num){
    num=Math.floor(Math.random() * (999999 - 100000 ) + 1);
    this.fcm.notificacionforToken("GoPay"," prueba scan Acaba de recibir el pago de  " +num+ "Bs. de "+'nombre usu'+" ",'cFraQK0mjZs:APA91bFdtCrYGKYRyi9Gt0MRH_HIAdg_cBhQjsU92SW1iyix7Xt0coRC0SAxgFp58aDVGMusWcs_W69vW0hxqiGxUIZoPvJeNwxfKqMZE_0Iw5pzccNKDlXJ9dMwuFzO_4dliZZ6gGRl','Qf8gWC5NZTS49GhEHRA6XpErZAi2',"/tabs/tab2")
    alert('se envio lan notificacion')
  }
}
