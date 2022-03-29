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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZHMtY29sbGVjdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9MaWJyYXJ5cy9zcmMvbGliL3NlZWRzLWNvbGxlY3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxzQkFBc0IsRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3Qyw0REFBNEQ7QUFDNUQsT0FBTyxFQUFDLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBQzdDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFrQnRELE1BQU0sT0FBTyxrQkFBa0I7SUFDcEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFnQjtRQUNsQyxPQUFPO1lBQ0gsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixTQUFTLEVBQUUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxDQUFDO1NBQ3RGLENBQUM7SUFDTixDQUFDOzsrR0FOUSxrQkFBa0I7Z0hBQWxCLGtCQUFrQixpQkFaM0IscUJBQXFCLGFBR3JCLFdBQVc7UUFDWCxlQUFlO1FBQ2IsWUFBWSxhQUdkLHFCQUFxQjtnSEFJWixrQkFBa0IsWUFWcEI7WUFDUCxXQUFXO1lBQ1gsZUFBZTtZQUNiLFlBQVk7U0FDZjsyRkFNVSxrQkFBa0I7a0JBZDlCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLHFCQUFxQjtxQkFDdEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFdBQVc7d0JBQ1gsZUFBZTt3QkFDYixZQUFZO3FCQUNmO29CQUNELE9BQU8sRUFBRTt3QkFDUCxxQkFBcUI7cUJBQ3RCO29CQUNELE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO2lCQUNsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuLy9pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xuaW1wb3J0IHsgU2VlZHNDb2xsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9zZWVkcy1jb2xsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBZYWFyYW51dFNlcnZpY2UgfSBmcm9tICcuLi95YWFyYW51dC5zZXJ2aWNlJztcclxuXG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU2VlZHNDb2xsZWN0Q29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBGb3Jtc01vZHVsZSxcbiAgICAvL0Jyb3dzZXJNb2R1bGVcbiAgICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgU2VlZHNDb2xsZWN0Q29tcG9uZW50XG4gIF0sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBTZWVkc0NvbGxlY3RNb2R1bGUge1xuICAgIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChlbnZpcm9ubWVudDogYW55KTogTW9kdWxlV2l0aFByb3ZpZGVyczxTZWVkc0NvbGxlY3RNb2R1bGU+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBTZWVkc0NvbGxlY3RNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtZYWFyYW51dFNlcnZpY2UsIHsgcHJvdmlkZTogJ2Vudmlyb25tZW50RmlsZScsIHVzZVZhbHVlOiBlbnZpcm9ubWVudCB9XVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==