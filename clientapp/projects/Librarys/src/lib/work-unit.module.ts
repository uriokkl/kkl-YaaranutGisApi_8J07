import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule} from '@angular/common'
import { FormsModule } from '@angular/forms';

import { WorkUnitComponent } from './work-unit.component';



@NgModule({
  declarations: [
    WorkUnitComponent
  ],
  imports: [
    FormsModule,
    //BrowserModule
      CommonModule
  ],         
  exports: [
    WorkUnitComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class WorkUnitModule { 
  
}
