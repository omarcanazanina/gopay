import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, NavParams } from '@ionic/angular';

import { IndexconfirmacionPage } from './indexconfirmacion.page';

const routes: Routes = [
  {
    path: '',
    component: IndexconfirmacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers:[
 
  ],

  declarations: [IndexconfirmacionPage]
})
export class IndexconfirmacionPageModule {}
