import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { ForestryTendersComponent } from './forestry-tenders.component';
import { YaaranutService } from '../yaaranut.service';

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
export class ForestryTendersModule {
    public static forRoot(environment: any): ModuleWithProviders<ForestryTendersModule> {
        return {
            ngModule: ForestryTendersModule,
            providers: [YaaranutService, { provide: 'environmentFile', useValue: environment }]
        };
    }
}
