import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalleingresoegreso',
  templateUrl: './detalleingresoegreso.page.html',
  styleUrls: ['./detalleingresoegreso.page.scss'],
})
export class DetalleingresoegresoPage implements OnInit {

  usu:any=[]

  constructor(private activatedRoute: ActivatedRoute, private au: AuthService,private modal: ModalController) { }

  ngOnInit() {

  }
  closeUsuario() {
    this.modal.dismiss()
  }
}
