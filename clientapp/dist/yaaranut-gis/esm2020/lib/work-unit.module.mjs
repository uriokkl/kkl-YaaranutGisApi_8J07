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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yay11bml0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL0xpYnJhcnlzL3NyYy9saWIvd29yay11bml0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsc0JBQXNCLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0Riw0REFBNEQ7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFBO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBZ0J0RCxNQUFNLE9BQU8sY0FBYztJQUNoQixNQUFNLENBQUMsT0FBTyxDQUFDLFdBQWdCO1FBQ2xDLE9BQU87WUFDSCxRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxDQUFDO1NBQ3RGLENBQUM7SUFDTixDQUFDOzsyR0FOUSxjQUFjOzRHQUFkLGNBQWMsaUJBWnZCLGlCQUFpQixhQUdqQixXQUFXO1FBQ1gsZUFBZTtRQUNiLFlBQVksYUFHZCxpQkFBaUI7NEdBSVIsY0FBYyxZQVZoQjtZQUNQLFdBQVc7WUFDWCxlQUFlO1lBQ2IsWUFBWTtTQUNmOzJGQU1VLGNBQWM7a0JBZDFCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLGlCQUFpQjtxQkFDbEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFdBQVc7d0JBQ1gsZUFBZTt3QkFDYixZQUFZO3FCQUNmO29CQUNELE9BQU8sRUFBRTt3QkFDUCxpQkFBaUI7cUJBQ2xCO29CQUNELE9BQU8sRUFBRSxDQUFFLHNCQUFzQixDQUFFO2lCQUNwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8vaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbidcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBXb3JrVW5pdENvbXBvbmVudCB9IGZyb20gJy4vd29yay11bml0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IGVudmlyb25tZW50fSBmcm9tICcuLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQnXHJcbmltcG9ydCB7IFlhYXJhbnV0U2VydmljZSB9IGZyb20gJy4uL3lhYXJhbnV0LnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIFdvcmtVbml0Q29tcG9uZW50XHJcbiAgXSxcclxuICBpbXBvcnRzOiBbXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIC8vQnJvd3Nlck1vZHVsZVxyXG4gICAgICBDb21tb25Nb2R1bGVcclxuICBdLCAgICAgICAgIFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIFdvcmtVbml0Q29tcG9uZW50XHJcbiAgXSxcclxuICBzY2hlbWFzOiBbIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgV29ya1VuaXRNb2R1bGUge1xyXG4gICAgcHVibGljIHN0YXRpYyBmb3JSb290KGVudmlyb25tZW50OiBhbnkpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFdvcmtVbml0TW9kdWxlPiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmdNb2R1bGU6IFdvcmtVbml0TW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtZYWFyYW51dFNlcnZpY2UsIHsgcHJvdmlkZTogJ2Vudmlyb25tZW50RmlsZScsIHVzZVZhbHVlOiBlbnZpcm9ubWVudCB9XVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==