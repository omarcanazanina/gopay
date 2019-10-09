import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { AlertController, NumericValueAccessor } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.page.html',
  styleUrls: ['./tarjetas.page.scss'],
})
export class TarjetasPage implements OnInit {
  public fecha:Date;
  constructor(private au: AuthService,
              public alertController: AlertController,
              private route:Router) { }
  usuario = {
    cajainterna: "",
    correo: "",
    nombre:"",
    pass:"",
    telefono:"",
    cajabancaria:"",
    uid:""
  }

  tarjetas:any=[]
  uu: any;
  monto:number;
  cajaactual:number;
 
  ngOnInit() {
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
    
    })
    this.au.recuperatarjeta(this.uu).subscribe(data =>{
      this.tarjetas=data;
    })
    }
    /* el input monto
    async presentAlertPrompt() {
      const alert = await this.alertController.create({
        header: 'Monto es'+' '+this.monto+' '+'Bs.',
       subHeader:'Ingrese su codigo',
        inputs: [
          {
            name: 'codigo',
            type: 'text',
            placeholder: 'Ingrese de seguridad'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Aceptar',
            handler: data => {
              if(data.codigo ==this.usuario.pass){
                this.cajaactual=parseInt(this.usuario.cajabancaria)+this.monto;
                this.au.actualizacaja({cajabancaria:this.cajaactual},this.usuario.uid);
                console.log('Confirm Ok');
                this.route.navigate(['/tabs/tab2'])
                this.au.ingresotarjeta();
              }else{
                console.log('negativo');
                this.au.passincorrecta();
              }
            }
          }
        ]
      });
  
      await alert.present();
    }*/
}
