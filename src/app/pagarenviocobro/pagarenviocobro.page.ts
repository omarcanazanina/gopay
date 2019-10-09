import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { AlertController, IonContent } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalController } from '@ionic/angular'
import { DetalleenviocobroPage } from '../detalleenviocobro/detalleenviocobro.page'
import { FcmService } from '../servicios/fcm.service';


@Component({
  selector: 'app-pagarenviocobro',
  templateUrl: './pagarenviocobro.page.html',
  styleUrls: ['./pagarenviocobro.page.scss'],
})
export class PagarenviocobroPage implements OnInit {
  idcobro = null;
  estado=true
  uu: any
  cobro: any = []
  usuario = {
    nombre: "",
    cajainterna: "",
    uid: "",
    password: "",
    telefono: "",
  }
  idcobrador: any
  cobrador: any = []
  cajaactual: number
  cajaactual1: any
  fecha: Date
  fechita: any
  cajainterna: number
  cajainterna1: any
  prueba1: any = []
  cobros: any = []
  recupera: any = []
  actual: any = []
  trans: any = []
  unidos: any[]

  numero = null
  nombresito =null
  caja: number
  caja1: any
  monto
  detalle

  @ViewChild("content", { static: true }) content: IonContent
  constructor(private activatedRoute: ActivatedRoute,
    private au: AuthService,
    public alertController: AlertController,
    public fire: AngularFirestore,
    public router: Router,
    public modal: ModalController,
    private fcm: FcmService,
    public route: Router) {
     }
    callFunction(es){
      if(es){
        this.content.scrollToBottom (2000);
      }
    }
  ngOnInit() {
    this.numero = this.activatedRoute.snapshot.paramMap.get('id')
    this.nombresito = this.activatedRoute.snapshot.paramMap.get('nombre')
    this.au.verificausuarioActivo(this.numero).subscribe(cont => {
      this.cobrador = cont[0]
      this.uu = this.au.pruebita();
      this.au.recuperaundato(this.uu).subscribe(usuario => {
        this.usuario = usuario;
        this.caja = parseFloat(this.usuario.cajainterna)
        this.caja1 = this.caja.toFixed(2)
        this.au.recuperacobrostransferencias(this.cobrador.uid, this.usuario.uid).subscribe(dat => {
          this.trans = dat
          this.actual = this.au.ordenarjson(this.trans, 'fecha', 'asc')
        })
        })
      })
  }

  async pagar(usu) {
    if (parseFloat(this.usuario.cajainterna) >= parseFloat(usu.monto)) {
      const alert = await this.alertController.create({
        header: 'Monto a pagar ' + ' ' + usu.monto + ' ' + 'Bs.',
        cssClass:'prompt_alert',
        inputs: [
          {
            name: 'codigo',
            type: 'tel',
            placeholder: 'Pin de seguridad'

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
              this.fecha = new Date();
              const mes = this.fecha.getMonth() + 1;
              this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();

              this.au.recuperaenviocobros(this.usuario.uid, this.cobrador.uid, usu.fechita).subscribe(dat => {
                let prueba11 = dat[0]
                this.au.agregafechapagocobros({ fechapago: this.fechita }, this.uu, usu.id)
                this.au.agregafechapagocobros({ fechapago: this.fechita }, this.cobrador.uid, prueba11.id)
                this.au.actualizaestadodecobro({ estado: 1 }, this.cobrador.uid, prueba11.id)
              })
              if (data.codigo == this.usuario.password) {
                this.cajaactual = parseFloat(this.usuario.cajainterna) - parseFloat(usu.monto);
                this.cajaactual1 = this.cajaactual.toFixed(2)
                this.au.actualizacaja({ cajainterna: this.cajaactual1 }, this.usuario.uid);
                this.au.actualizaestadodecobro({ estado: 1 }, this.usuario.uid, usu.id)
                this.fire.collection('/user/' + this.usuario.uid + '/egreso').add({
                  monto: usu.monto,
                  id: this.cobrador.uid,
                  nombre: this.cobrador.nombre,
                  telefono: this.cobrador.telefono,
                  fechita: this.fechita,
                  fecha: this.fecha,
                  descripcion: 'pago por envio de cobro',
                  saldo: this.cajaactual1,
                  identificador: '0'
                })
                this.cajainterna = parseFloat(this.cobrador.cajainterna) + parseFloat(usu.monto);
                this.cajainterna1 = this.cajainterna.toFixed(2)
                this.au.actualizacaja({ cajainterna: this.cajainterna }, this.cobrador.uid)
                this.fire.collection('/user/' + this.cobrador.uid + '/ingresos').add({
                  monto: usu.monto,
                  id: this.usuario.uid,
                  nombre: this.usuario.nombre,
                  telefono: this.usuario.telefono,
                  fechita: this.fechita,
                  fecha: this.fecha,
                  descripcion: 'recibio por envio de cobro',
                  saldo: this.cajainterna1,
                  identificador: '1'
                })
                this.au.pagodecobroexitoso(usu.monto, this.cobrador.nombre);
                this.router.navigate(['/transferencias'])
                this.estado=true
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

  opendetalle(usu) {
    this.modal.create({
      component: DetalleenviocobroPage,
      cssClass: 'detalleenviocobro',
      componentProps: {
        usu: usu
      }
    }).then((modal) => modal.present())
  }

  async transferencia(monto, detalle) {
    if (monto <= 0) {
      this.au.ingresoinvalido()
    } else {
      //
      if (parseFloat(this.usuario.cajainterna) >= monto) {
        const alert = await this.alertController.create({
          header: 'Monto a transferir' + ' ' + monto + ' ' + 'Bs. a ' + this.cobrador.nombre,
          cssClass:'prompt_alert',
          inputs: [
            {
              name: 'codigo',
              type: 'tel',
              placeholder: 'Pin de seguridad'

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
                this.fecha = new Date();
                const mes = this.fecha.getMonth() + 1;
                this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();

                if (data.codigo == this.usuario.password) {
                  this.cajaactual = parseFloat(this.cobrador.cajainterna) + monto;
                  this.cajaactual1 = this.cajaactual.toFixed(2)
                  this.au.actualizacaja({ cajainterna: this.cajaactual1 }, this.cobrador.uid);
                  this.fire.collection('/user/' + this.cobrador.uid + '/ingresos').add({
                    monto: monto,
                    id: this.usuario.uid,
                    nombre: this.usuario.nombre,
                    telefono: this.usuario.telefono,
                    fechita: this.fechita,
                    fecha: this.fecha,
                    descripcion: 'transferencia',
                    saldo: this.cajaactual1,
                    identificador: '1'
                  })
                  this.cajainterna = parseFloat(this.usuario.cajainterna) - monto;
                  this.cajainterna1 = this.cajainterna.toFixed(2)
                  this.au.actualizacaja({ cajainterna: this.cajainterna1 }, this.usuario.uid)
                  this.fire.collection('/user/' + this.usuario.uid + '/egreso').add({
                    monto: monto,
                    id: this.cobrador.uid,
                    nombre: this.cobrador.nombre,
                    telefono: this.cobrador.telefono,
                    fechita: this.fechita,
                    fecha: this.fecha,
                    descripcion: 'transferencia',
                    saldo: this.cajainterna1,
                    identificador: '0'
                  })

                  this.fire.collection('/user/' + this.usuario.uid + '/cobrostransferencias').add({
                    dato: 'enviatransferencia',
                    monto: monto,
                    detalle: detalle,
                    clave: this.cobrador.uid,
                    nombre: this.cobrador.nombre,
                    telefono: this.cobrador.telefono,
                    fechita: this.fechita,
                    fecha: this.fecha,
                    saldo: this.cajainterna1
                  })
                  this.fire.collection('/user/' + this.cobrador.uid + '/cobrostransferencias').add({
                    dato: 'recibetransferencia',
                    monto: monto,
                    detalle: detalle,
                    clave: this.usuario.uid,
                    nombre: this.usuario.nombre,
                    telefono: this.usuario.telefono,
                    fechita: this.fechita,
                    fecha: this.fecha,
                    saldo: this.cajaactual1

                  })
                  this.au.transexitoso1(monto, this.cobrador.nombre);
                  this.fcm.notificacionforToken("GoPay", "Acaba de recibir una tranferencia de " + monto + "Bs. de " + this.usuario.nombre + " ", this.cobrador.token, this.usuario.uid, "/tabs/tab2")
                  this.modal.dismiss();
                  this.monto = ''
                  this.detalle = ''
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

  enviacobro(monto, detalle) {
    this.fecha = new Date();
    const mes = this.fecha.getMonth() + 1;
    this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();
    this.fire.collection('/user/' + this.usuario.uid + '/cobrostransferencias').add({
      monto: monto,
      dato: 'enviado',
      clave: this.cobrador.uid,
      nombre: this.cobrador.nombre,
      telefono: this.cobrador.telefono,
      fechita: this.fechita,
      fecha: this.fecha,
      fechapago: '',
      detalle: detalle,
      estado: 0
    })
    this.fire.collection('/user/' + this.cobrador.uid + '/cobrostransferencias').add({
      monto: monto,
      dato: 'recibio',
      clave: this.usuario.uid,
      nombre: this.usuario.nombre,
      telefono: this.usuario.telefono,
      fechita: this.fechita,
      fecha: this.fecha,
      fechapago: '',
      detalle: detalle,
      estado: 0
    })
    this.au.enviocobro(monto, this.cobrador.nombre)
    this.fcm.notificacionforToken("GoPay", "Acaba de recibir una solicitud de pago de " + monto + "Bs. de " + this.usuario.nombre + " ", this.cobrador.token, this.usuario.uid, "/tabs/tab2")
    this.monto = ''
    this.detalle = ''
    //this.route.navigate(['tabs/tab2'])
  }

}
