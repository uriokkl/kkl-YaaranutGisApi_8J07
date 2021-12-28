import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { BrowserModule } from '@angular/platform-browser';
import {CommonModule } from '@angular/common'
import { SeedsCollectComponent } from './seeds-collect.component';



@NgModule({
  declarations: [
    SeedsCollectComponent
  ],
  imports: [
    FormsModule,
    //BrowserModule
      CommonModule
  ],
  exports: [
    SeedsCollectComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeedsCollectModule { }
