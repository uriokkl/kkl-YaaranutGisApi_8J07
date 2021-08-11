import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { WorkUnitComponent} from './work-unit/work-unit.component'
@NgModule({
  declarations: [
    AppComponent,
    WorkUnitComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
