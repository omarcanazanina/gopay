import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

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
    badge:""
  }
  uu: any
  historial = []
  cont: any

  datos = []
  constructor(private router: Router,
    private au: AuthService,
    private route: Router) {
  }

  ngOnInit() {
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
      this.au.ordenarcobrostransferencias(this.usuario.uid).subscribe(info => {
        this.historial = info.filter((valor, indiceActual, arreglo) => arreglo.findIndex((item) => item.telefono === valor.telefono
        ) === indiceActual) ;
        console.log(this.historial);
        //prueba para los badges
      })
    })
  }

  paso() {
    this.router.navigate(['/transferencias'])
  }

  enviadatos(usu) {
    this.route.navigate(['/pagarenviocobro', usu.telefono,usu.nombre])
  }
  
}
