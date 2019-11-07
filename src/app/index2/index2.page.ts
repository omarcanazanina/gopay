import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../servicios/auth.service'
import { Router } from '@angular/router'
import { FCM } from '@ionic-native/fcm/ngx';
import * as firebase from 'firebase';
@Component({
  selector: 'app-index2',
  templateUrl: './index2.page.html',
  styleUrls: ['./index2.page.scss'],
})
export class Index2Page implements OnInit {
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  constructor(private fauth: AuthService,
    public alertCtrl: AlertController,
    private fcm: FCM,
    private router: Router,
    private loadingController: LoadingController
  ) { }
  //@ViewChild('focus', { static: true }) myInput;
  usuario = {
    pass: ""
  }

  correo: string;
  pass: string;
  password_type: string = 'password';
  password: any
  con: string
  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',{
      'size':'invisible'
    })
    /* setTimeout(() => {
       this.myInput.setFocus();
     }, 150) */
  }
  //logueo pa cualquiera dato ocn
  verificar(dato) {
    const resultado = dato.indexOf('@', 0)
    if (resultado < 0) {
      //signIn(phoneNumber: number) {
      const appVerifier = this.recaptchaVerifier;
      const phoneNumberString = "+591" + dato;
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
                  confirmationResult.confirm(data.confirmationCode).then((result) => {
                    this.fcm.getToken().then(t => {
                    this.fauth.actualizatoken({ token: t }, result.user.uid).then(() => {
                      this.fauth.recuperaundato(result.user.uid).subscribe(usuario => {
                        this.usuario = usuario;
                        if (this.usuario.pass == this.pass) {
                          console.log('son iguales');
                          this.router.navigate(["/indexconfirmacion"])
                        } else {
                          console.log('se vino al else');
                          this.fauth.ingresoinvalido()
                        }
                      })
                    }).catch(error => {
                    })
                  }).catch(err => {
                  })
                      //
                }).catch((error) => {
                  console.log('este es el error' + error);
                  this.fauth.codigoinvalido()
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
      //}
    } else {
      console.log('es correo');
      // login() {
      let load = this.presentLoading()
      this.fauth.login(dato, this.pass).then(res => {
        console.log(JSON.stringify(res.user.uid))
        this.fcm.getToken().then(t => {
          this.fauth.actualizatoken({ token: t }, res.user.uid).then(() => {
            load.then(loading => {
              loading.dismiss()
            })
            //prueba
            this.fauth.recuperaundato(res.user.uid).subscribe(dato=>{
             alert(JSON.stringify(dato))
            })
            //
            this.router.navigate(['/indexconfirmacion']);
            load.then(l => {
              l.dismiss()
            })
          }).catch(error => { 
          })
        }).catch(err => {
        })
      }).catch(err => {
        console.log('tamos en el else login');
        load.then(loading => {
          loading.dismiss()
        })
        this.fauth.ingresoinvalido()
      });
      //}
    }
  }

  togglePasswordMode() {
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Verificando...!'
    });
    await loading.present();
    return loading
  }
  //independiente pal correo
  login() {
    let load = this.presentLoading()
    this.fauth.login(this.correo, this.pass).then(res => {
      console.log(JSON.stringify(res.user.uid))
      this.fcm.getToken().then(t => {
        this.fauth.actualizatoken({ token: t }, res.user.uid).then(() => {
          load.then(loading => {
            loading.dismiss()
          })
          this.router.navigate(['/indexconfirmacion']);
          load.then(l => {
            l.dismiss()
          })
        }).catch(error => {

        })
      }).catch(err => {
      })
    }).catch(err => {
      this.fauth.ingresoinvalido()
    });
  }
  //independiente pal numero
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
                    this.fauth.recuperaundato(result.user.uid).subscribe(usuario => {
                      this.usuario = usuario;
                      if (this.usuario.pass == this.password) {
                        console.log('son iguales');
                        this.router.navigate(["/indexconfirmacion"])
                      } else {
                        console.log('se vino al else');
                        this.fauth.ingresoinvalido()
                      }
                    })
                    //
                  }).catch((error) => {
                    console.log('este es el error' + error);
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
}
