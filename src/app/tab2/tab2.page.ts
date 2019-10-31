import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ModalController } from '@ionic/angular';
import { DetalleegresoPage } from '../detalleegreso/detalleegreso.page';
import { EnviadatosgmailPage } from '../enviadatosgmail/enviadatosgmail.page';

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
    private emailComposer:EmailComposer,
    private modalController:ModalController) {
      //lo nuevo
      this.barcodeScannerOptions = {
        showTorchButton: true,
        showFlipCameraButton: true
      };
      //
  }
  cont
  correo: string;
  usuario = {
    cajainterna: "",
    correo: "",
    monto: "",
    nombre: "",
    uid: ""
  }
  uu: any;
  lista: any;
  caja: number
  caja1: any

  //num1
  primero = ''
  segundo = ''
  para = ''
  ngOnInit() {
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
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

  enviar(){
    let email = {
      to: this.para,
      cc: [],
      bcc: [],
      attachments: [],
      subject: this.primero,
      body: this.segundo,
      isHtml: true
      //app: 'Gmail'
    
    }
    this.emailComposer.open(email);
  }

  async enviadatos(usu) {
    const modal = await this.modalController.create({
      component: EnviadatosgmailPage,
      //showBackdrop: false,
      cssClass: 'enviadatos',
      componentProps: {
        usu: this.usuario
      }
    });
    return await modal.present();
  }
  async detalleegreso(usu) {
    const modal = await this.modalController.create({
      component: DetalleegresoPage,
      //showBackdrop: false,
      cssClass: 'detalleegreso',
      componentProps: {
        usu: this.usuario
      }
    });
    return await modal.present();
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






