import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegistratePage } from './registrate.page';
import { CustomFormsModule } from 'ng2-validation';
const routes: Routes = [
  {
    path: '',
    component: RegistratePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegistratePage]
})
export class RegistratePageModule {}
