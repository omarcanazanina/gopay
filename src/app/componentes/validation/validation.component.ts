import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
})
export class ValidationComponent implements OnChanges {

  @Input() variable: AbstractControl
  @Input() error

  @Input() nombre
  message = null
  constructor() { }

  ngOnChanges(change: SimpleChanges) {
    this.error = change.error.currentValue
    this.actualizar()
  }
  actualizar() {
    if (this.error) {
      let key = Object.keys(this.error)[0]
      switch (key) {
        case "required": {
          this.message = `${this.nombre} es requerido.`
          break
        }
        case "minlength": {
          let err = this.error.minlength
          this.message = `${this.nombre} tienen que contener al menos ${err.requiredLength} caracteres.`
          break
        }
        case "maxlength": {
          let err = this.error.maxlength
          this.message = `${this.nombre} no tiene que ser mayor a ${err.requiredLength} caracteres.`
          break
        }
        case "pattern": {
          this.message = `${this.nombre} no es valido.`
          break
        }
        case "email": {
          this.message = `No es un correo electronico valido.`
          break
        }
        case "notEquals": {
          this.message = `Las contraseñas no coinsiden.`
          break
        }
      }
    }
  }
}

