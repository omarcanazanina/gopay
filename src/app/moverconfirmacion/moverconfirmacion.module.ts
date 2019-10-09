import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MoverconfirmacionPage } from './moverconfirmacion.page';

const routes: Routes = [
  {
    path: '',
    component: MoverconfirmacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MoverconfirmacionPage]
})
export class MoverconfirmacionPageModule {}
