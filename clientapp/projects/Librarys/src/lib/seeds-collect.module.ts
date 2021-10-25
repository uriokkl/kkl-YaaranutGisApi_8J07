import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SeedsCollectComponent } from './seeds-collect.component';



@NgModule({
  declarations: [
    SeedsCollectComponent
  ],
  imports: [
    FormsModule,
    BrowserModule
  ],
  exports: [
    SeedsCollectComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeedsCollectModule { }
