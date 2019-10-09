import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { FcmService } from '../servicios/fcm.service';


@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.page.html',
  styleUrls: ['./escaner.page.scss'],
})
export class EscanerPage implements OnInit {
  public fecha: Date;
  montito = null;
  correo = null;
  constructor(private activatedRoute: ActivatedRoute,
    private au: AuthService,
    public alertController: AlertController,
    public fire: AngularFirestore,
    public route:Router,
    private fcm:FcmService) { }
  uu: any;
  usuario = {
    cajainterna: "",
    nombre: "",
    password: "",
    uid:"",
    telefono:""
  }
  concorreo = {
    nombre: "",
    uid: "",
    telefono: "",
    pass: "",
    cajainterna: "",
    token:""
  }
  fechita:any;
  cajaactual:number;
  cajaactual1:any
  cajaresta:number;
  cajaresta1:any
  real:number;
  ngOnInit() {
    this.montito =this.activatedRoute.snapshot.paramMap.get('montito');
    this.correo = this.activatedRoute.snapshot.paramMap.get('correo');
    this.real=parseFloat(this.montito)
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
    })
    this.au.recuperaconcorreo(this.correo).subscribe(concorreo => {
      this.concorreo = concorreo[0];
    })
    this.fecha = new Date();
    const mes = this.fecha.getMonth() + 1;
    this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();
  }
  
  async presentAlertPrompt() {
   if (parseFloat(this.usuario.cajainterna) >= this.real) {
      const alert = await this.alertController.create({
        header: 'Se pagara Bs. '  + this.montito + ' a '+ this.concorreo.nombre,
        inputs: [
          {
            name: 'codigo',
            type: 'tel',
            placeholder: 'PIN de Seguridad'
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Confirmar',
            handler: data => {
              if (data.codigo == this.usuario.password) {
                this.cajaactual =parseFloat (this.concorreo.cajainterna) +this.real;
                this.cajaactual1 = this.cajaactual.toFixed(2)
                this.au.actualizacaja({ cajainterna: this.cajaactual1 }, this.concorreo.uid);
                this.fire.collection('/user/'+this.concorreo.uid+'/ingresos').add({
                  monto:this.real,
                  id:this.usuario.uid,
                  nombre:this.usuario.nombre,
                  telefono:this.usuario.telefono,
                  fechita:this.fechita,
                  fecha:this.fecha,
                  descripcion:'pago por lectura',
                  saldo:this.cajaactual,
                  identificador:'1'
                })
                console.log("se realizo la suma");
                this.cajaresta = parseFloat(this.usuario.cajainterna) - this.real;
                this.cajaresta1 = this.cajaresta.toFixed(2)
                this.au.actualizacaja({ cajainterna: this.cajaresta1 }, this.uu);
                this.fire.collection('/user/'+this.uu+'/egreso').add({
                  monto:this.real,
                  id:this.concorreo.uid,
                  nombre:this.concorreo.nombre,
                  telefono:this.concorreo.telefono,
                  fechita:this.fechita,
                  fecha:this.fecha,
                  descripcion:'pago por lectura',
                  saldo:this.cajaresta,
                  identificador:'0'
                })
              
                this.au.presentToast(this.real,this.concorreo.nombre);
                this.fcm.notificacionforToken("GoPay"," prueba scan Acaba de recibir el pago de  " +this.real+ "Bs. de "+this.usuario.nombre+" ",this.concorreo.token,this.usuario.uid,"/tabs/tab2")
                this.route.navigate(['tabs/tab2'])
              }
              else {
                this.au.passincorrecta();
              }
            }
          }
        ]
      });
      await alert.present();
    
    }else{
      const alert = await this.alertController.create({
        header: 'Atención',
        message: 'Su ahorro es insuficiente para realizar el pago ',
        buttons: ['Aceptar']
      });
  
      await alert.present();
  
    }
  }

}
