import { Inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class YaaranutService {
    constructor(config) {
        this.config = config;
        this.apiUrl = "";
        this.apiUrl = config.GisApiUrl;
        //this.apiUrl = 'https://kkl-yaaranutgisapi.azurewebsites.net';
    }
}
YaaranutService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: YaaranutService, deps: [{ token: 'environmentFile' }], target: i0.ɵɵFactoryTarget.Injectable });
YaaranutService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: YaaranutService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: YaaranutService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: ['environmentFile']
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFhcmFudXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL0xpYnJhcnlzL3NyYy95YWFyYW51dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUF1QixNQUFNLGVBQWUsQ0FBQzs7QUFLeEUsTUFBTSxPQUFPLGVBQWU7SUFHeEIsWUFBK0MsTUFBVztRQUFYLFdBQU0sR0FBTixNQUFNLENBQUs7UUFGckQsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUdiLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQTtRQUMvQiwrREFBK0Q7SUFDbEUsQ0FBQzs7NEdBTlEsZUFBZSxrQkFHSixpQkFBaUI7Z0hBSDVCLGVBQWU7MkZBQWYsZUFBZTtrQkFEM0IsVUFBVTs7MEJBSU0sTUFBTTsyQkFBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIGlzRGV2TW9kZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVGVzdEJlZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvdGVzdGluZyc7XHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgWWFhcmFudXRTZXJ2aWNlIHtcclxuICBwdWJsaWMgYXBpVXJsID0gXCJcIjtcclxuICAgXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KCdlbnZpcm9ubWVudEZpbGUnKSBwcml2YXRlIGNvbmZpZzogYW55ICkge1xyXG4gICAgICAgIHRoaXMuYXBpVXJsID0gY29uZmlnLkdpc0FwaVVybFxyXG4gICAgICAgLy90aGlzLmFwaVVybCA9ICdodHRwczovL2trbC15YWFyYW51dGdpc2FwaS5henVyZXdlYnNpdGVzLm5ldCc7XHJcbiAgICB9XHJcbn1cclxuIl19