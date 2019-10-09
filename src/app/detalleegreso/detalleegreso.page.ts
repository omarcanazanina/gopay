import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalleegreso',
  templateUrl: './detalleegreso.page.html',
  styleUrls: ['./detalleegreso.page.scss'],
})
export class DetalleegresoPage implements OnInit {

  usu:any=[]
  cont=0
  constructor(private activatedRoute: ActivatedRoute, private au: AuthService,private modal: ModalController) { }

  ngOnInit() {
    console.log(this.usu.banco);
    
  if(this.usu.banco != undefined)
  this.cont=1
  }
  closeUsuario() {
    this.modal.dismiss()
  }

}
