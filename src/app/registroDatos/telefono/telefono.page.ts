import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from 'src/app/servicios/auth.service';
import { FCM } from '@ionic-native/fcm/ngx';
@Component({
  selector: 'app-telefono',
  templateUrl: './telefono.page.html',
  styleUrls: ['./telefono.page.scss'],
})
export class TelefonoPage implements OnInit {
  nombre = null
  email = null
  contrasena = null
  pin = null
  cajainterna = 0
  badge = 0
  eltoken:any
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  constructor(private route: Router,
    private activate: ActivatedRoute,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public fire: AngularFirestore,
    public au: AuthService,
    private loadingController: LoadingController, 
    private fcm: FCM) { }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container1',{
      'size':'invisible'
    })
    this.nombre = this.activate.snapshot.paramMap.get('nombre')
    this.email = this.activate.snapshot.paramMap.get('email')
    this.contrasena = this.activate.snapshot.paramMap.get('contrasena')
    this.pin = this.activate.snapshot.paramMap.get('pin')
  }
  signIn(phoneNumber: number) {
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+591" + phoneNumber;
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then(async confirmationResult => {
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
                confirmationResult.confirm(data.confirmationCode)
                  .then((result) => {
                    let load = this.presentLoading();
                     this.fcm.getToken().then(token => {
                       this.au.crearcontel(result.user.uid,this.email,this.contrasena,this.pin,this.nombre,phoneNumberString,this.cajainterna,token,this.badge)
                         this.au.creocorrecto();
                         load.then(loading => {
                           loading.dismiss()
                         })
                         this.route.navigate(['/indexconfirmacion']);
                     })
                  }).catch((error) => {
                    this.au.codigoinvalido()
                    // User couldn't sign in (bad verification code?)
                  })
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
  verificar(phoneNumber){
    this.fcm.getToken().then(token => {
      this.au.crear(this.email,this.contrasena,this.pin,this.nombre,phoneNumber,this.cajainterna,token,this.badge)
      this.au.creocorrecto();
      this.eltoken=token
      this.route.navigate(['/confirmarnum',this.eltoken])
    })
  }
}
