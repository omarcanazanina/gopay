import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NuevatarjetaPage } from './nuevatarjeta.page';
//import { BrMaskerModule } from 'brmasker-ionic-3';  mascara

import { TextMaskModule } from 'angular2-text-mask';
const routes: Routes = [
  {
    path: '',
    component: NuevatarjetaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //BrMaskerModule,
    TextMaskModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NuevatarjetaPage]
})
export class NuevatarjetaPageModule {}
