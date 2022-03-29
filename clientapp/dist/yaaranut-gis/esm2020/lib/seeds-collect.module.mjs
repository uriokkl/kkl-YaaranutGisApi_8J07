import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SeedsCollectComponent } from './seeds-collect.component';
import { YaaranutService } from '../yaaranut.service';
import * as i0 from "@angular/core";
export class SeedsCollectModule {
    static forRoot(environment) {
        return {
            ngModule: SeedsCollectModule,
            providers: [YaaranutService, { provide: 'environmentFile', useValue: environment }]
        };
    }
}
SeedsCollectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: SeedsCollectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SeedsCollectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: SeedsCollectModule, declarations: [SeedsCollectComponent], imports: [FormsModule,
        //BrowserModule
        CommonModule], exports: [SeedsCollectComponent] });
SeedsCollectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: SeedsCollectModule, imports: [[
            FormsModule,
            //BrowserModule
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: SeedsCollectModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZHMtY29sbGVjdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9MaWJyYXJ5cy9zcmMvbGliL3NlZWRzLWNvbGxlY3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxzQkFBc0IsRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3Qyw0REFBNEQ7QUFDNUQsT0FBTyxFQUFDLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBQzdDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFrQnRELE1BQU0sT0FBTyxrQkFBa0I7SUFDcEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFnQjtRQUNsQyxPQUFPO1lBQ0gsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixTQUFTLEVBQUUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxDQUFDO1NBQ3RGLENBQUM7SUFDTixDQUFDOzsrR0FOUSxrQkFBa0I7Z0hBQWxCLGtCQUFrQixpQkFaM0IscUJBQXFCLGFBR3JCLFdBQVc7UUFDWCxlQUFlO1FBQ2IsWUFBWSxhQUdkLHFCQUFxQjtnSEFJWixrQkFBa0IsWUFWcEI7WUFDUCxXQUFXO1lBQ1gsZUFBZTtZQUNiLFlBQVk7U0FDZjsyRkFNVSxrQkFBa0I7a0JBZDlCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLHFCQUFxQjtxQkFDdEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFdBQVc7d0JBQ1gsZUFBZTt3QkFDYixZQUFZO3FCQUNmO29CQUNELE9BQU8sRUFBRTt3QkFDUCxxQkFBcUI7cUJBQ3RCO29CQUNELE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO2lCQUNsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG4vL2ltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nXHJcbmltcG9ydCB7IFNlZWRzQ29sbGVjdENvbXBvbmVudCB9IGZyb20gJy4vc2VlZHMtY29sbGVjdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBZYWFyYW51dFNlcnZpY2UgfSBmcm9tICcuLi95YWFyYW51dC5zZXJ2aWNlJztcclxuXHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIFNlZWRzQ29sbGVjdENvbXBvbmVudFxyXG4gIF0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICAvL0Jyb3dzZXJNb2R1bGVcclxuICAgICAgQ29tbW9uTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBTZWVkc0NvbGxlY3RDb21wb25lbnRcclxuICBdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VlZHNDb2xsZWN0TW9kdWxlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChlbnZpcm9ubWVudDogYW55KTogTW9kdWxlV2l0aFByb3ZpZGVyczxTZWVkc0NvbGxlY3RNb2R1bGU+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogU2VlZHNDb2xsZWN0TW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtZYWFyYW51dFNlcnZpY2UsIHsgcHJvdmlkZTogJ2Vudmlyb25tZW50RmlsZScsIHVzZVZhbHVlOiBlbnZpcm9ubWVudCB9XVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIl19