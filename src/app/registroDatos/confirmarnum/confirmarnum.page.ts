import { Component, OnInit, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { FcmService } from 'src/app/servicios/fcm.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirmarnum',
  templateUrl: './confirmarnum.page.html',
  styleUrls: ['./confirmarnum.page.scss'],
})
export class ConfirmarnumPage implements OnInit {
  codigo: any
  uu:any
  num:any
  token=null
  telefono=null
  usuario = {
    cajainterna: "",
    nombre: "",
    password: "",
    telefono: "",
    uid: ""
  }

  constructor(private fcm: FcmService,
    private au: AuthService,
    private activate: ActivatedRoute,
    private router:Router) {
      
     }
  

  ngOnInit() {
   this.token = this.activate.snapshot.paramMap.get('token')
   alert(this.token)
   this.telefono = this.activate.snapshot.paramMap.get('telefono')
   this.au.recuperacontoken(this.token).subscribe(usuario =>{
    this.usuario=usuario[0]
    console.log(this.usuario);
    
  })
  }

  generar() {
      this.num = Math.floor(Math.random() * (99999 - 10000) + 1);
      console.log("este es el usuario"+ this.usuario.nombre);
      
      this.fcm.notificacionforToken("GoPay", "Copie codigo de verificación  " + this.num +" ", this.token, this.usuario.uid, "/confirmarnum")
  }

  verificar(){
    if(this.codigo == this.num && this.telefono == this.usuario.telefono ){
      this.router.navigate(['/tabs/tab2'])
    }else{
      alert('Vuelva a confirmar codigo por favor');
    }
  }

  verificar1(){
  /*  if(this.codigo == this.num){
      this.au.login(dato, this.pass).then(res => {
            this.router.navigate(['/tabs/tab2']);
          }).catch(error => { 
      })
    }*/
  }
  
}
