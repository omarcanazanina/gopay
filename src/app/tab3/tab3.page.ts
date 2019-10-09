import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private au: AuthService,
    public alertController: AlertController,
    private route: Router) { }
  usuario = {
    cajainterna: "",
    correo: "",
    nombre: "",
    pass: "",
    telefono: "",
    cajabancaria: "",
    uid: ""
  }

  tarjetas: any = []
  uu: any;
  monto: number;
  cajaactual: number;

  ngOnInit() {
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
    })
    this.au.recuperatarjeta(this.uu).subscribe(data =>{
      this.tarjetas=data;
    })
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: 'Esta seguro que desea cerrar sesión',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
           this.au.cerrarsesion()
          }
        }
      ]
    });
    await alert.present();
  }


}
