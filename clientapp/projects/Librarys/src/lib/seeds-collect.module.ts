import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { BrowserModule } from '@angular/platform-browser';
import {CommonModule } from '@angular/common'
import { SeedsCollectComponent } from './seeds-collect.component';
import { YaaranutService } from '../yaaranut.service';



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
export class SeedsCollectModule {
    public static forRoot(environment: any): ModuleWithProviders<SeedsCollectModule> {
        return {
            ngModule: SeedsCollectModule,
            providers: [YaaranutService, { provide: 'environmentFile', useValue: environment }]
        };
    }
}
