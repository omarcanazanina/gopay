import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { UsuarioComponent } from '../componentes/usuario/usuario.component';
import { Contacts, Contact } from '@ionic-native/contacts/ngx';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.page.html',
  styleUrls: ['./transferencias.page.scss'],
})
export class TransferenciasPage implements OnInit {
  datito = []
  ContactsNone = []
  ContactsTrue = []
  ContactsSearch = []
  usuario = {
    nombre: ""
  }
  sub
  uu: any
  items: any
  constructor(private au: AuthService,
    public modal: ModalController,
    private contactos: Contacts,
    public loadingController: LoadingController,
    private route: Router,
    private socialShare: SocialSharing
  ) {
    this.loadContacts()
    //this.getContactos()
  }

  getItems(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.ContactsTrue = this.ContactsTrue.filter((item) => {
        return (item.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  ngOnInit() {
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
    })
    this.au.recuperadatos().subscribe(datos => {
      this.datito = datos;
    })
  }

  openusu(usu) {
    this.modal.create({
      component: UsuarioComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        usu: usu
      }
    }).then((modal) => modal.present())
  }
  //otro metodo para import contactos

  loadContacts() {
    let load = this.presentLoading()
    let options = {
      filter: '',
      multiple: true,
      hasPhoneNumber: true
    }
    this.contactos.find(['*'], options).then((contactos: Contact[]) => {
      alert(JSON.stringify(contactos))
      for (let item of contactos) {
        if (item.phoneNumbers) {
         // item["value"] = this.codigo(item.phoneNumbers[0].value)
         // alert(item["value"])
          this.au.verificausuarioActivo(this.codigo(item.phoneNumbers[0].value))
            .subscribe(resp => {
              if (resp.length > 0) {
                this.ContactsTrue.push(item)
              } else {
                this.ContactsNone.push(item)
                }
            })
        }
      }
      load.then(loading => {
        loading.dismiss();
      })
    })
  }

  /*
  getContactos() {
     let load = this.presentLoading()
     this.contactos.find(['displayName', 'phoneNumbers'], { multiple: true })
       .then(data => {
         console.log(JSON.stringify(data));
         for (let item of data) {
           if (item.phoneNumbers) {
             item["numero"] = this.codigo(item.phoneNumbers[0].value)
             this.sub = this.au.verificausuarioActivo(this.codigo(item.phoneNumbers[0].value))
               .subscribe(resp => {
                 if (resp.length > 0) {
                   this.ContactsTrue.push(item)
                 } else {
                   this.ContactsNone.push(item)
                 }
               })
           }
         }
         // sub.unsubscribe()
         load.then(loading => {
           loading.dismiss();
         })
       })
       .catch(err => {
         console.log("error", err);
         alert(err)
       });
   }
 */
  codigo(num) {
    let nuevo = num.replace("+591", "").trim()
    return nuevo
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando contactos--',
      duration: 2000
    });
    await loading.present();
    return loading;
  }
  enviadatos(usu) {
    this.route.navigate(['/pagarenviocobro', usu.phoneNumbers[0].value, usu.name.givenName])
  }

  invitar() {
    this.socialShare.shareWithOptions({
      message: "Prueba GoPay, es ideal para realizar pagos y transferencias de una manera secilla y fácil",
      subject: "QR Transaccion",
      url: 'Android:https://play.google.com/store/apps/details?id=com.hegaro.goodme&hl=es_BO  IOS:www.hegaro.com.bo',
      chooserTitle: 'Compartir Via'
    }).then(() => {
      console.log("shared successfull");
    }).catch((e) => {
      console.log("shared failed" + e);
    });
  }
}
