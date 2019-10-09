import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pin',
  templateUrl: './pin.page.html',
  styleUrls: ['./pin.page.scss'],
})
export class PinPage implements OnInit {
  public mask = [/[0-9]/, /\d/, /\d/, /\d/]
  constructor(private activate: ActivatedRoute,
    private route: Router) { }
  nombre = null
  email = null
  contrasena = null
  pin: any
  ngOnInit() {
    this.nombre = this.activate.snapshot.paramMap.get('nombre')
    this.email = this.activate.snapshot.paramMap.get('email')
    this.contrasena = this.activate.snapshot.paramMap.get('contrasena')
  }
  crear() {
    this.route.navigate(["/telefono",this.nombre,this.email,this.contrasena,this.pin])
  }

}
