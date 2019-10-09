import { Component, OnInit, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { FcmService } from 'src/app/servicios/fcm.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmarnum',
  templateUrl: './confirmarnum.page.html',
  styleUrls: ['./confirmarnum.page.scss'],
})
export class ConfirmarnumPage implements OnInit {
  codigo: any
  uu:any
  num:any
  token='dtnHrMFMyMc:APA91bFr9GOhVOeC2cQa_YBZbHmHOEnmuZjQQXOpeJm5zjQSc3qUhwPpmyn0lzfcw8YyfSkIR-xK16sNF-tD0fVc4kahz9jchUvv4O8G6w9lgIWAvaL_qAqQ07VhkaUAD40aAOZpAOtQ'
  usuario = {
    cajainterna: "",
    nombre: "",
    password: "",
    telefono: "",
    uid: ""
  }
  constructor(private fcm: FcmService,
    private au: AuthService,
    private activate: ActivatedRoute,) { }
  

  ngOnInit() {
    this.token = this.activate.snapshot.paramMap.get('token')
  }

  generar() {
    this.au.recuperacontoken(this.token).subscribe(usuario =>{
      this.usuario=usuario[0]
      this.num = Math.floor(Math.random() * (99999 - 10000) + 1);
      this.fcm.notificacionforToken("GoPay", "Copie codigo de verificación  " + this.num +" ", this.token, this.usuario.uid, "/tabs/tab2")
    })
  }
  verificar(){
    if(this.codigo == this.num){
      alert('son iguales');
    }else{
      alert('no son iguales');
      
    }
  }
}
