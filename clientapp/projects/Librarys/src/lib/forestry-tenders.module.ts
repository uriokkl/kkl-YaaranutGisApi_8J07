import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { ForestryTendersComponent } from './forestry-tenders.component';

@NgModule({
  declarations: [
    ForestryTendersComponent
  ],
    imports: [
        FormsModule,
        //BrowserModule
        CommonModule
  ],
  exports: [
    ForestryTendersComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ForestryTendersModule { }
