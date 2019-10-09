import { Component, OnInit} from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AuthService } from '../servicios/auth.service';
@Component({
  selector: 'app-recibedinero',
  templateUrl: './recibedinero.page.html',
  styleUrls: ['./recibedinero.page.scss'],
 
})
export class RecibedineroPage implements OnInit {
  usuario={
    correo:""
   }
   uu:any;
   correo =null;
   createdCode =null;
  constructor( private barcode:BarcodeScanner, private au:AuthService) { 
  }
  
  ngOnInit() {
    this.uu=this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario=>{
      this.usuario=usuario;
      this.createdCode = this.usuario.correo;
    })
   
  }


}
