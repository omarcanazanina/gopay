import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistorialenviocobroPage } from './historialenviocobro.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialenviocobroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HistorialenviocobroPage]
})
export class HistorialenviocobroPageModule {}
