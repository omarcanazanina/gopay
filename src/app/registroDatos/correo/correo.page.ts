import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {
  nombre=null
  email:any
  constructor(public router:Router,
    private activate:ActivatedRoute) { }

  ngOnInit() {
    this.nombre=this.activate.snapshot.paramMap.get('nombre')
  }
  ingreso(){
    this.router.navigate(['/password',this.nombre,this.email])
  }
}
