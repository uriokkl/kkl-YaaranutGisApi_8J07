import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule} from '@angular/common'
import { FormsModule } from '@angular/forms';

import { WorkUnitComponent } from './work-unit.component';
import { environment} from '../environments/environment'
import { YaaranutService } from '../yaaranut.service';

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
    public static forRoot(environment: any): ModuleWithProviders<WorkUnitModule> {
        return {
            ngModule: WorkUnitModule,
            providers: [YaaranutService, { provide: 'environmentFile', useValue: environment }]
        };
    }

}
