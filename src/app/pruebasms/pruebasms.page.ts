import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../servicios/auth.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pruebasms',
  templateUrl: './pruebasms.page.html',
  styleUrls: ['./pruebasms.page.scss'],
})
export class PruebasmsPage implements OnInit {
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  constructor( private route: Router,
    public alertCtrl: AlertController,
    public au: AuthService,
    private loadingController: LoadingController,
    private fcm: FCM ) { }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container1',{
      'size':'invisible'
    })
  }
  
  signIn(phoneNumber: number) {
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+591" + phoneNumber;
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then(async confirmationResult => {
        console.log(confirmationResult);
        
        const alert = await this.alertCtrl.create({
          header: 'Ingrese codigo',
          inputs: [{ name: 'confirmationCode', placeholder: 'Codigo de confirmacion' }],
          buttons: [
            {
              text: 'Cancelar',
              handler: data => { console.log('Cancel clicked'); }
            },
            {
              text: 'Enviar',
              handler: data => {
               /* confirmationResult.confirm(data.confirmationCode)
                  .then((result) => {
                    //let load = this.presentLoading();
                    // this.fcm.getToken().then(token => {
                       //this.au.crearcontel(result.user.uid,this.email,this.contrasena,this.pin,this.nombre,phoneNumberString,this.cajainterna,token,this.badge)
                        // this.au.creocorrecto();
                        // load.then(loading => {
                         //  loading.dismiss()
                        // })
                    //     this.route.navigate(['/indexconfirmacion']);
                   //  })
                  }).catch((error) => {
                    this.au.codigoinvalido()
                    // User couldn't sign in (bad verification code?)
                  }) */
              }
            }
          ]
        });
        alert.present();
      })
      .catch(function (error) {
        alert('no se envio')
        console.error("SMS not sent", error);
      });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Guardando"
    });
    await loading.present();
    return loading
  }

}
