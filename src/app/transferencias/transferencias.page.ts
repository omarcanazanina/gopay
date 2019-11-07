import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { LoadingController } from '@ionic/angular';
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
  ContactsNoneOrden: any
  ContactsTrueOrden: any
  Ordenado: []
  Ordenado1: []
  textoBuscar = ''
  constructor(private au: AuthService,
    private contactos: Contacts,
    public loadingController: LoadingController,
    private route: Router,
    private socialShare: SocialSharing
  ) {
    this.loadContacts()
  }

  BuscarContacto(event) {
    this.textoBuscar = event.target.value;
  }

  ngOnInit() {
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
      for (let item of contactos) {
        if (item.phoneNumbers) {
          // item["value"] = this.codigo(item.phoneNumbers[0].value)
          // alert(item["value"])
          this.au.verificausuarioActivo(this.codigo(item.phoneNumbers[0].value))
            .subscribe(resp => {
              if (resp.length > 0) {
                this.ContactsTrue.push(item)
                //this.ContactsTrueOrden=this.au.ordenarjson(this.ContactsTrue,'usu.name.givenName','asc')
              } else {
                this.ContactsNone.push(item) 
                //this.ContactsNoneOrden=this.au.ordenarjson(this.ContactsNone,'usu.name.giveName','asc')
              }
            })
        }
      }
      load.then(loading => {
        loading.dismiss();
      })
    })
  }


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
    this.route.navigate(['/pagarenviocobro', usu.phoneNumbers[0].value, usu.name.formatted])
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
