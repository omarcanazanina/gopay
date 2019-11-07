import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalController, AlertController } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
//import { EnviadatosgmailPage } from '../enviadatosgmail/enviadatosgmail.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  //lo nuevo
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  //

  public data = {
    text: ""
  };
  option: BarcodeScannerOptions;
  constructor(public bar: BarcodeScanner,
    private route: Router,
    public fire: AngularFirestore,
    private au: AuthService,
    //private modalController:ModalController,
    public alertController: AlertController,
    private emailComposer: EmailComposer) {
    //lo nuevo
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };


  }
  cont
  correo: string;
  usuario = {
    cajainterna: "",
    correo: "",
    telefono: "",
    password: "",
    monto: "",
    nombre: "",
    uid: "",
    pass: "",
    estado: ""
  }
  uu: any;
  lista: any;
  caja: number
  caja1: any

  //num1
  primero = 'GoPay'
  segundo = ''
  para = ''
  ngOnInit() {
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
      if (parseInt(this.usuario.estado) == 0) {
        this.datosgmail()
      } else {
        console.log('no es 0');
      }
    })
  }

  scan() {
    this.option = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      resultDisplayDuration: 500,
      formats: 'QR_CODE,PDF_417 ',
      orientation: 'landscape',
      prompt: "por favor lea el codigo QR"
    }
    this.bar.scan(this.option).then(barcodeData => {
      this.data = barcodeData;
      const convertido = this.data.text.split("/");
      const convertido1 = convertido[0];
      const convertido2 = convertido[1];
      var c = 0;
      var letra = "/"
      for (var i = 0; i <= this.data.text.length; i++) {
        if (this.data.text[i] == letra) {
          c++
        }
      }
      if (c == 0 && this.data.text != "") {
        this.route.navigate(['/cards', this.data.text])
      } else {
        this.route.navigate(['/escaner', convertido1, convertido2])
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  historial() {
    this.route.navigate(['/ingresoegreso'])
  }

  async datosgmail() {
    const alert = await this.alertController.create({
      header: 'GoPay',
      message: '<div> Por su seguridad y respaldo se enviara los datos a su correo <strong>' + this.usuario.correo + '</strong><br><br></div><table> <tr><td><strong>Nombre:</strong></td><td>' + this.usuario.nombre + '</td></tr> <tr><td><strong>Telefono:</strong></td><td>' + this.usuario.telefono + '</td></tr> <tr><td><strong>Correo:</strong></td><td>' + this.usuario.correo + '</td></tr><tr><td><strong>Pin:</strong></td><td>' + this.usuario.password + '</td></tr><tr><td><strong>Contraseña:</strong></td><td>' + this.usuario.pass + '</td></tr></table>',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Enviar',
          handler: () => {
            let email = {
              to: this.usuario.correo,
              cc: [],
              bcc: [],
              attachments: [],
              subject: this.primero,
              body: 'MUY IMPORTANTE, SE RECOMIENDA GUARDAR SUS DATOS' + ' ' + 'nombre:' + ' ' + this.usuario.nombre + ' ' + 'telefono:' + ' ' + this.usuario.telefono + ' ' + 'correo:' + ' ' + this.usuario.correo + ' ' + 'pin:' + ' ' + this.usuario.password + ' ' + 'contraseña:' + ' ' + this.usuario.pass,
              isHtml: true
              //app: 'Gmail'

            }
            this.emailComposer.open(email);
            this.au.enviocorreo({ estado: 1 }, this.usuario.uid)
            console.log('Confirm Okay');
          }

        }
      ]
    });

    await alert.present();
  }


  /*
  decimal(num){
    num=23.49898
    this.num1
    if(num%1 !=0){
      console.log('es decimal');
      this.num1=num.toFixed(1)
      console.log(this.num1);
      
    }else{
      console.log("es entero");
      
    }
  }
  */

}






