import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moverdinero',
  templateUrl: './moverdinero.page.html',
  styleUrls: ['./moverdinero.page.scss'],
})
export class MoverdineroPage implements OnInit {
  constructor(private au: AuthService, private route: Router,private auth:AuthService) {
  }
  usuario = {
    cajainterna: "",
    correo: "",
    nombre: "",
    pass: "",
    telefono: "",
    cajabancaria: "",
    uid: ""
  }
  uu: any
  tarjetas: any = []
  datito: any
  dato1: any
  dato2: any
  app:any
  ngOnInit() {
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
      this.dato1 = parseInt(this.usuario.cajainterna)
    })
    this.au.recuperatarjeta(this.uu).subscribe(data => {
      this.tarjetas = data;
      console.log(this.tarjetas);
      
    })
  }
  mover() {
    if(this.dato1==this.dato2){
      this.auth.distintastarjetas();
    }else{
      this.route.navigate(['/moverconfirmacion', this.dato1,this.dato2 ]);
    }
 

  }
}
