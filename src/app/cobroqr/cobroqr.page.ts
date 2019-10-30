import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cobroqr',
  templateUrl: './cobroqr.page.html',
  styleUrls: ['./cobroqr.page.scss'],
})
export class CobroqrPage implements OnInit {
  qrData = "";
  createdCode = null;
  user: string
  usuario = {
    cajainterna: "",
    correo: ""
  }
  uu: any;
  numero = 0
  value = ""
  num
  gruponum = [7, 8, 9,4, 5, 6,1, 2, 3,'.', 0, 'Borrar']
   cont=0
  constructor(private barcode: BarcodeScanner, private au: AuthService, private route: Router) { }

  ngOnInit() {
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario => {
      this.usuario = usuario;
      this.user = this.usuario.correo;
    })
  }
  createCode() {
    if (this.qrData <= "" || this.qrData == '0' || this.qrData == '0.' || this.qrData == '.0' || this.qrData =='.' || this.qrData =='00' || this.qrData =='000'|| this.qrData =='0000') {
      this.au.ingresoinvalido()
      this.route.navigate(['/recibedinero'])
    } else {
      this.createdCode = this.qrData + "/" + this.usuario.correo;
    }
    this.numero = 1
  }
  volver() {
    this.route.navigate(['/recibedinero'])
  }
  presionar(num) {
  console.log(num);
  
    this.qrData = this.qrData + num
    if (num == 'Borrar') {
      this.qrData = ""
    } if(num == '.'){
      this.cont=this.cont+1
    }  if(this.cont > 1){
      this.qrData = ""
      this.cont=0
    }
  }
}
