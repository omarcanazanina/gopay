import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indexconfirmacion',
  templateUrl: './indexconfirmacion.page.html',
  styleUrls: ['./indexconfirmacion.page.scss'],
})
export class IndexconfirmacionPage implements OnInit {
  constructor(
    private au: AuthService,
    private router:Router) { }
  usuario = {
    nombre: ""
  }
  uu: any;
  ngOnInit() {
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
    })
  }

  ingresar(){
    this.router.navigate(["/tabs/tab2"])
  }

}
