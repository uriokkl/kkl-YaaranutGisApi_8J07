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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZXN0cnktdGVuZGVycy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9MaWJyYXJ5cy9zcmMvbGliL2ZvcmVzdHJ5LXRlbmRlcnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxzQkFBc0IsRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3Qyw0REFBNEQ7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBQzlDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFnQnRELE1BQU0sT0FBTyxxQkFBcUI7SUFDdkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFnQjtRQUNsQyxPQUFPO1lBQ0gsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixTQUFTLEVBQUUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxDQUFDO1NBQ3RGLENBQUM7SUFDTixDQUFDOztrSEFOUSxxQkFBcUI7bUhBQXJCLHFCQUFxQixpQkFaOUIsd0JBQXdCLGFBR3BCLFdBQVc7UUFDWCxlQUFlO1FBQ2YsWUFBWSxhQUdoQix3QkFBd0I7bUhBSWYscUJBQXFCLFlBVnJCO1lBQ0wsV0FBVztZQUNYLGVBQWU7WUFDZixZQUFZO1NBQ2pCOzJGQU1VLHFCQUFxQjtrQkFkakMsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1osd0JBQXdCO3FCQUN6QjtvQkFDQyxPQUFPLEVBQUU7d0JBQ0wsV0FBVzt3QkFDWCxlQUFlO3dCQUNmLFlBQVk7cUJBQ2pCO29CQUNELE9BQU8sRUFBRTt3QkFDUCx3QkFBd0I7cUJBQ3ZCO29CQUNELE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO2lCQUNwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xuaW1wb3J0IHsgRm9yZXN0cnlUZW5kZXJzQ29tcG9uZW50IH0gZnJvbSAnLi9mb3Jlc3RyeS10ZW5kZXJzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBZYWFyYW51dFNlcnZpY2UgfSBmcm9tICcuLi95YWFyYW51dC5zZXJ2aWNlJztcclxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBGb3Jlc3RyeVRlbmRlcnNDb21wb25lbnRcbiAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICAvL0Jyb3dzZXJNb2R1bGVcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBGb3Jlc3RyeVRlbmRlcnNDb21wb25lbnRcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBGb3Jlc3RyeVRlbmRlcnNNb2R1bGUge1xuICAgIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChlbnZpcm9ubWVudDogYW55KTogTW9kdWxlV2l0aFByb3ZpZGVyczxGb3Jlc3RyeVRlbmRlcnNNb2R1bGU+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBGb3Jlc3RyeVRlbmRlcnNNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtZYWFyYW51dFNlcnZpY2UsIHsgcHJvdmlkZTogJ2Vudmlyb25tZW50RmlsZScsIHVzZVZhbHVlOiBlbnZpcm9ubWVudCB9XVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==