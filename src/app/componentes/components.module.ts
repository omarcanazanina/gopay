import {NgModule} from '@angular/core'
import { ValidationComponent } from './validation/validation.component';
import { CommonModule } from '@angular/common';
@NgModule({
    imports:[
        CommonModule
    ],
    declarations:[ValidationComponent],
    exports:[ValidationComponent]
})
export class ComponentsModule{}