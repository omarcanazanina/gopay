import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-enviadatosgmail',
  templateUrl: './enviadatosgmail.page.html',
  styleUrls: ['./enviadatosgmail.page.scss'],
})
export class EnviadatosgmailPage implements OnInit {

  constructor(private modal: ModalController) { }
  usu:any=[]
  cont=0
  ngOnInit() {
    console.log(this.usu.banco);
    
    if(this.usu.banco != undefined)
    this.cont=1
    }
    closeUsuario() {
      this.modal.dismiss()
    }

}
