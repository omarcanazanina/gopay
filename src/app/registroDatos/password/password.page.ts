import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  constructor(private router:Router,private activate:ActivatedRoute) { }
contrasena:any
confirma:any
nombre=null
email=null
  ngOnInit() {
    this.nombre=this.activate.snapshot.paramMap.get('nombre')
    this.email=this.activate.snapshot.paramMap.get('email')
  }
  guardarphone(){
    if(this.contrasena == this.confirma){
      this.router.navigate(["/pin",this.nombre,this.email,this.contrasena])
    }else{
      alert('contrasenas no coinciden')
    }
    
  }
}
