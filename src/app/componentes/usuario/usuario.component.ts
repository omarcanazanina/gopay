import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { AuthService, usu } from '../../servicios/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { FcmService} from '../../servicios/fcm.service';

//import { TransferenciasComponent } from '../transferencias/transferencias.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
   usu1: any
   usuario: any
   monto: number
   mensaje: string
   caja: number
   telefono: string
   id: string
   fecha: Date
   cajaactual: number
   cajaactual1:any
   cajainterna: number
   cajainterna1:any
   uid: string
  constructor(private modal: ModalController,
    private Nav: NavParams,
    public fire: AngularFirestore,
    private au: AuthService,
    private db: AngularFireDatabase,
    public alertController: AlertController,
    public router:Router,
    private fcm:FcmService
   ) { }
  usuario1 = {
    nombre: "",
    cajainterna: "",
    uid: "",
    password: "",
    telefono: ""
  }
  uu: any;
  fechita: any;
  cont
  usu: any=[]
  @ViewChild('focus',{static:true}) myInput ;

 
  ngOnInit() {
    alert("entro")
    this.usu = this.Nav.get('usu');
    this.au.verificausuarioActivo(this.usu.numero).subscribe(c =>{
      alert(c)
    alert(JSON.stringify(c))
    this.cont=c
      alert(JSON.stringify(this.cont))
    })

    this.fecha = new Date();
    const mes = this.fecha.getMonth() + 1;
    this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();

    this.uu = this.au.pruebita();
    //console.log("el id del autenticado ahora" + " " + this.uu);
    this.au.recuperaundato(this.uu).subscribe(usuario1 => {
      this.usuario1 = usuario1;
    })
    setTimeout(() => {
      this.myInput.setFocus();
    },150)
  }
  closeUsuario() {
    this.modal.dismiss()
  }
  async presentAlertPrompt() {
    console.log("este es el monto"+this.monto); 
    if (this.monto <= 0){
      this.au.ingresoinvalido()
    }else{
    //
    if (parseFloat(this.usuario1.cajainterna) >= this.monto) {
      const alert = await this.alertController.create({
        header: 'Esta seguro que desea transferir ' + ' ' + this.monto + ' ' + 'Bs. a ' + this.usu.nombre,
        subHeader: 'Ingrese su codigo',
        inputs: [
          {
            name: 'codigo',
            type: 'tel',
            placeholder: 'Codigo de seguridad'
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
            text: 'Confirmar',
            handler: data => {
             if (data.codigo == this.usuario1.password) {
               this.cajaactual =parseFloat(this.usu.cajainterna) + this.monto;
               this.cajaactual1 = this.cajaactual.toFixed(2)
              this.au.actualizacaja({ cajainterna: this.cajaactual1 }, this.usu.uid);
                this.fire.collection('/user/' + this.usu.uid + '/ingresos').add({
                  monto: this.monto,
                  id: this.usuario1.uid,
                  nombre: this.usuario1.nombre,
                  telefono: this.usuario1.telefono,
                  fechita: this.fechita,
                  fecha: this.fecha,
                  descripcion: 'transferencia',
                  saldo:this.cajaactual1,
                  identificador:'1'
                })
                this.cajainterna = parseFloat(this.usuario1.cajainterna) - this.monto;
                this.cajainterna1 = this.cajainterna.toFixed(2)
                this.au.actualizacaja({ cajainterna: this.cajainterna1 }, this.usuario1.uid)
                this.fire.collection('/user/' + this.usuario1.uid + '/egreso').add({
                  monto: this.monto,
                  id: this.usu.uid,
                  nombre: this.usu.nombre,
                  telefono: this.usu.telefono,
                  fechita: this.fechita,
                  fecha: this.fecha,
                  descripcion: 'transferencia',
                  saldo:this.cajainterna1,
                  identificador:'0'
                })
              
                this.fire.collection('/user/' + this.usuario1.uid + '/transferencias').add({
                  dato:'enviatransferencia',
                  monto: this.monto,
                  detalle: this.mensaje,
                  clave: this.usu.uid,
                  nombre: this.usu.nombre,
                  telefono: this.usu.telefono,
                  fechita: this.fechita,
                  fecha: this.fecha,
                  saldo: this.cajainterna1
                })
                this.fire.collection('/user/' + this.usu.uid + '/transferencias').add({
                  dato:'recibetransferencia',
                  monto: this.monto,
                  detalle: this.mensaje,
                  clave: this.usuario1.uid,
                  nombre: this.usuario1.nombre,
                  telefono: this.usuario1.telefono,
                  fechita: this.fechita,
                  fecha: this.fecha,
                  saldo:this.cajaactual1
        
                })
               this.au.transexitoso1(this.monto,this.usu.nombre);
                this.fcm.notificacionforToken("GoPay","Acaba de recibir una tranferencia de " +this.monto+ "Bs. de "+this.usuario1.nombre+" ",this.usu.token,this.usuario1.uid,"/tabs/tab2")
                this.modal.dismiss(); 
                this.router.navigate(['/tabs/tab2'])
              } else {
                this.au.passincorrecta();
              }
            }
          }
        ]
      });
      await alert.present();
   } else {

      this.au.insuficiente();
    }
  }
  }


  }


  /*
   insertar(monto:number, mensaje:string, id : string, telefono:string,myDate:string){
     return new Promise<any>((resolve, reject) => {
         this.fire.collection('/user/'+this.usuario1.uid+'/transferencias').add({
         monto: this.monto,
         mensaje:this.mensaje,
         id:this.usu.id,
         nombre:this.usu.nombre,
         telefono:this.usu.telefono,
         fecha:this.fecha
       }).then((res) => {
         resolve(res)
       },err => reject(err))
     })
 }
 updatecaja(cajaactual:number,id:string){
   this.id=this.usu.id;
   this.uid=this.usuario1.uid;
     if(parseInt(this.usuario1.cajainterna) >= this.monto){
       this.cajaactual=this.usu.cajainterna+this.monto;
       //console.log("beneficiado"+" "+this.cajaactual)
       this.cajainterna=parseInt(this.usuario1.cajainterna)-this.monto;
       //console.log("esta es la caja del logueado"+this.cajainterna);
       this.au.actualizacaja({cajainterna:this.cajaactual},this.usu.id);
       this.au.actualizacaja({cajainterna:this.cajainterna},this.usuario1.uid)
       this.au.transexitoso();
       this.modal.dismiss();
     }else{
     this.au.insuficiente();
     }
   
 }*/

  /*
 realizartranferencia(){
   this.id=this.usu.id;
   this.uid=this.usuario1.uid;
   if(parseInt(this.usuario1.cajainterna) >= this.monto){
     this.fire.collection('/user/'+this.usuario1.uid+'/transferencias').add({
       monto: this.monto,
       mensaje:this.mensaje,
       id:this.usu.id,
       nombre:this.usu.nombre,
       telefono:this.usu.telefono,
       fecha:this.fecha
     })
     this.cajaactual=this.usu.cajainterna+this.monto;
     //console.log("beneficiado"+" "+this.cajaactual)
     this.cajainterna=parseInt(this.usuario1.cajainterna)-this.monto;
     //console.log("esta es la caja del logueado"+this.cajainterna);
     this.au.actualizacaja({cajainterna:this.cajaactual},this.usu.id);
     this.au.actualizacaja({cajainterna:this.cajainterna},this.usuario1.uid)
     this.au.transexitoso();
     this.modal.dismiss();
   }else{
   this.au.insuficiente();
   }
 }
 */
