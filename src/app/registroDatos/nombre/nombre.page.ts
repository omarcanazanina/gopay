import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nombre',
  templateUrl: './nombre.page.html',
  styleUrls: ['./nombre.page.scss'],
})
export class NombrePage implements OnInit {
  nombre:string
  formulario:FormGroup
  constructor(public router:Router, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.formulario= this.formBuilder.group({
			email: ["", [
				Validators.required,
				//Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),
				Validators.email
			]
			],
			password: ["", [
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(20),
			]
			],
			confirm_password: [""],
			nombre_completo: ["", Validators.required],
			foto: [""],
			cod: ["591"],
			peso: [80, Validators.required],
			altura: [170, Validators.required],
			fecha_nacimiento: ["", Validators.required],
			genero: ["FEMENINO"],
			telefono: ["", [
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(15)
			]],
		});
  }

  ingreso(){
    this.router.navigate(['/correo',this.nombre])
  }
}
