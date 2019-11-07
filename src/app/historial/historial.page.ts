import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { Contacts, Contact } from '@ionic-native/contacts/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  usuario = {
    nombre: "",
    telefono: "",
    uid: "",
    badge: ""
  }
  uu: any
  historial = []
  cont: any

  datos = []
  textoBuscar = ''
  c = 0
//para importar contactos
  ContactsNone = []
  ContactsTrue = []
  controlador = 0
  constructor(private router: Router,
    private au: AuthService,
    private route: Router,
    private contactos: Contacts,
    private socialShare: SocialSharing) {
  }

  ngOnInit() {
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
      this.au.ordenarcobrostransferencias(this.usuario.uid).subscribe(info => {
        this.historial = info.filter((valor, indiceActual, arreglo) => arreglo.findIndex((item) => item.telefono === valor.telefono
        ) === indiceActual);
        console.log(this.historial);
        if(this.historial.length > 0)
        this.c=1

        //importar contactos
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
        })
      })
    })
  }
  codigo(num) {
    let nuevo = num.replace("+591", "").trim()
    return nuevo
  }

  BuscarHistorial(event) {
    this.textoBuscar = event.target.value;
    if(this.textoBuscar !=''){
      this.controlador = 1
    }else{
      this.controlador = 0
    }
  }

  paso() {
    this.router.navigate(['/transferencias'])
  }

  enviadatos(usu) {
    this.route.navigate(['/pagarenviocobro', usu.telefono, usu.nombre])
  }

  enviadatos2(usu) {
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
