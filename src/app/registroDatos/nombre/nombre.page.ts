import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nombre',
  templateUrl: './nombre.page.html',
  styleUrls: ['./nombre.page.scss'],
})
export class NombrePage implements OnInit {
  nombre:string
  constructor(public router:Router) { }

  ngOnInit() {
  }

  ingreso(){
    this.router.navigate(['/correo',this.nombre])
  }
}
