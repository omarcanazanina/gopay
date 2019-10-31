import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { Filtro1Pipe } from './filtro1.pipe';



@NgModule({
  declarations: [FiltroPipe, Filtro1Pipe],
  exports: [FiltroPipe,Filtro1Pipe]
})
export class PipesModule { }
