import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ForestryTendersComponent } from './forestry-tenders.component';
import { YaaranutService } from '../yaaranut.service';
import * as i0 from "@angular/core";
export class ForestryTendersModule {
    static forRoot(environment) {
        return {
            ngModule: ForestryTendersModule,
            providers: [YaaranutService, { provide: 'environmentFile', useValue: environment }]
        };
    }
}
ForestryTendersModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ForestryTendersModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ForestryTendersModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ForestryTendersModule, declarations: [ForestryTendersComponent], imports: [FormsModule,
        //BrowserModule
        CommonModule], exports: [ForestryTendersComponent] });
ForestryTendersModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ForestryTendersModule, imports: [[
            FormsModule,
            //BrowserModule
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ForestryTendersModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZXN0cnktdGVuZGVycy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9MaWJyYXJ5cy9zcmMvbGliL2ZvcmVzdHJ5LXRlbmRlcnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxzQkFBc0IsRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3Qyw0REFBNEQ7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBQzlDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFnQnRELE1BQU0sT0FBTyxxQkFBcUI7SUFDdkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFnQjtRQUNsQyxPQUFPO1lBQ0gsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixTQUFTLEVBQUUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxDQUFDO1NBQ3RGLENBQUM7SUFDTixDQUFDOztrSEFOUSxxQkFBcUI7bUhBQXJCLHFCQUFxQixpQkFaOUIsd0JBQXdCLGFBR3BCLFdBQVc7UUFDWCxlQUFlO1FBQ2YsWUFBWSxhQUdoQix3QkFBd0I7bUhBSWYscUJBQXFCLFlBVnJCO1lBQ0wsV0FBVztZQUNYLGVBQWU7WUFDZixZQUFZO1NBQ2pCOzJGQU1VLHFCQUFxQjtrQkFkakMsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1osd0JBQXdCO3FCQUN6QjtvQkFDQyxPQUFPLEVBQUU7d0JBQ0wsV0FBVzt3QkFDWCxlQUFlO3dCQUNmLFlBQVk7cUJBQ2pCO29CQUNELE9BQU8sRUFBRTt3QkFDUCx3QkFBd0I7cUJBQ3ZCO29CQUNELE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO2lCQUNwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG4vL2ltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xyXG5pbXBvcnQgeyBGb3Jlc3RyeVRlbmRlcnNDb21wb25lbnQgfSBmcm9tICcuL2ZvcmVzdHJ5LXRlbmRlcnMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgWWFhcmFudXRTZXJ2aWNlIH0gZnJvbSAnLi4veWFhcmFudXQuc2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRm9yZXN0cnlUZW5kZXJzQ29tcG9uZW50XHJcbiAgXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBGb3Jtc01vZHVsZSxcclxuICAgICAgICAvL0Jyb3dzZXJNb2R1bGVcclxuICAgICAgICBDb21tb25Nb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEZvcmVzdHJ5VGVuZGVyc0NvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9yZXN0cnlUZW5kZXJzTW9kdWxlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChlbnZpcm9ubWVudDogYW55KTogTW9kdWxlV2l0aFByb3ZpZGVyczxGb3Jlc3RyeVRlbmRlcnNNb2R1bGU+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogRm9yZXN0cnlUZW5kZXJzTW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtZYWFyYW51dFNlcnZpY2UsIHsgcHJvdmlkZTogJ2Vudmlyb25tZW50RmlsZScsIHVzZVZhbHVlOiBlbnZpcm9ubWVudCB9XVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIl19