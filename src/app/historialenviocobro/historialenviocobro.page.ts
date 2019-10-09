import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-historialenviocobro',
  templateUrl: './historialenviocobro.page.html',
  styleUrls: ['./historialenviocobro.page.scss'],
})
export class HistorialenviocobroPage implements OnInit {
  id=null
  uu:any
  usuario = {
    nombre: "",
    cajainterna: "",
    uid: "",
    password: "",
    telefono: "",
  }
  constructor(private activatedRoute: ActivatedRoute, private au:AuthService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.uu = this.au.pruebita();
    this.au.recuperaundato(this.uu).subscribe(usuario1 => {
      this.usuario = usuario1;
    })
    
  }

}
