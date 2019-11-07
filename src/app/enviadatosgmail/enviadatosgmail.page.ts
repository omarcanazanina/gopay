import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-enviadatosgmail',
  templateUrl: './enviadatosgmail.page.html',
  styleUrls: ['./enviadatosgmail.page.scss'],
})
export class EnviadatosgmailPage implements OnInit {

  constructor(private emailComposer:EmailComposer) { }
  usu = {
    cajainterna: "",
    correo: "",
    nombre:"",
    pass:"",
    telefono:"",
    cajabancaria:"",
    uid:""
  }
  primero = 'GoPay'
  segundo = ''
  para = this.usu.correo
  ngOnInit() {
    
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

}
