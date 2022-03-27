import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkUnitComponent } from './work-unit.component';
import { YaaranutService } from '../yaaranut.service';
import * as i0 from "@angular/core";
export class WorkUnitModule {
    static forRoot(environment) {
        return {
            ngModule: WorkUnitModule,
            providers: [YaaranutService, { provide: 'environmentFile', useValue: environment }]
        };
    }
}
WorkUnitModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: WorkUnitModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
WorkUnitModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: WorkUnitModule, declarations: [WorkUnitComponent], imports: [FormsModule,
        //BrowserModule
        CommonModule], exports: [WorkUnitComponent] });
WorkUnitModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: WorkUnitModule, imports: [[
            FormsModule,
            //BrowserModule
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: WorkUnitModule, decorators: [{
            type: NgModule,
            args: [{
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
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yay11bml0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL0xpYnJhcnlzL3NyYy9saWIvd29yay11bml0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsc0JBQXNCLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0Riw0REFBNEQ7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFBO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBZ0J0RCxNQUFNLE9BQU8sY0FBYztJQUNoQixNQUFNLENBQUMsT0FBTyxDQUFDLFdBQWdCO1FBQ2xDLE9BQU87WUFDSCxRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxDQUFDO1NBQ3RGLENBQUM7SUFDTixDQUFDOzsyR0FOUSxjQUFjOzRHQUFkLGNBQWMsaUJBWnZCLGlCQUFpQixhQUdqQixXQUFXO1FBQ1gsZUFBZTtRQUNiLFlBQVksYUFHZCxpQkFBaUI7NEdBSVIsY0FBYyxZQVZoQjtZQUNQLFdBQVc7WUFDWCxlQUFlO1lBQ2IsWUFBWTtTQUNmOzJGQU1VLGNBQWM7a0JBZDFCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLGlCQUFpQjtxQkFDbEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFdBQVc7d0JBQ1gsZUFBZTt3QkFDYixZQUFZO3FCQUNmO29CQUNELE9BQU8sRUFBRTt3QkFDUCxpQkFBaUI7cUJBQ2xCO29CQUNELE9BQU8sRUFBRSxDQUFFLHNCQUFzQixDQUFFO2lCQUNwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vL2ltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IFdvcmtVbml0Q29tcG9uZW50IH0gZnJvbSAnLi93b3JrLXVuaXQuY29tcG9uZW50JztcbmltcG9ydCB7IGVudmlyb25tZW50fSBmcm9tICcuLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQnXG5pbXBvcnQgeyBZYWFyYW51dFNlcnZpY2UgfSBmcm9tICcuLi95YWFyYW51dC5zZXJ2aWNlJztcclxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBXb3JrVW5pdENvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgLy9Ccm93c2VyTW9kdWxlXG4gICAgICBDb21tb25Nb2R1bGVcbiAgXSwgICAgICAgICBcbiAgZXhwb3J0czogW1xuICAgIFdvcmtVbml0Q29tcG9uZW50XG4gIF0sXG4gIHNjaGVtYXM6IFsgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSBdXG59KVxuZXhwb3J0IGNsYXNzIFdvcmtVbml0TW9kdWxlIHtcbiAgICBwdWJsaWMgc3RhdGljIGZvclJvb3QoZW52aXJvbm1lbnQ6IGFueSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8V29ya1VuaXRNb2R1bGU+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBXb3JrVW5pdE1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1lhYXJhbnV0U2VydmljZSwgeyBwcm92aWRlOiAnZW52aXJvbm1lbnRGaWxlJywgdXNlVmFsdWU6IGVudmlyb25tZW50IH1dXG4gICAgICAgIH07XG4gICAgfVxuXG59XG4iXX0=