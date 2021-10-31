import { Injectable, isDevMode, Optional } from '@angular/core';
import { environment } from './environments/environment';
import { environmentTest } from './environments/environment.test';
import { environmentProd } from './environments/environment.prod';
import * as i0 from "@angular/core";
import * as i1 from "@angular/core/testing";
export class YaaranutService {
    constructor(testBed) {
        this.apiUrl = "";
        if (isDevMode()) {
            this.apiUrl = environment.apiUrl;
            this.apiUrl = environmentTest.apiUrl;
        }
        else if (testBed !== null) {
            this.apiUrl = environmentTest.apiUrl;
        }
        else {
            this.apiUrl = environmentProd.apiUrl;
        }
    }
}
YaaranutService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: YaaranutService, deps: [{ token: i1.TestBed, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
YaaranutService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: YaaranutService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: YaaranutService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.TestBed, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFhcmFudXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL0xpYnJhcnlzL3NyYy95YWFyYW51dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7O0FBR2xFLE1BQU0sT0FBTyxlQUFlO0lBR3hCLFlBQXdCLE9BQXVCO1FBRjFDLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFHYixJQUFJLFNBQVMsRUFBRSxFQUFFO1lBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQztTQUN4QzthQUNJLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUM7U0FDeEM7YUFDSTtZQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQztTQUN4QztJQUVMLENBQUM7OzRHQWZRLGVBQWU7Z0hBQWYsZUFBZTsyRkFBZixlQUFlO2tCQUQzQixVQUFVOzswQkFJTSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgaXNEZXZNb2RlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUZXN0QmVkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS90ZXN0aW5nJztcclxuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudCc7XHJcbmltcG9ydCB7IGVudmlyb25tZW50VGVzdCB9IGZyb20gJy4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50LnRlc3QnO1xyXG5pbXBvcnQgeyBlbnZpcm9ubWVudFByb2QgfSBmcm9tICcuL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudC5wcm9kJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFlhYXJhbnV0U2VydmljZSB7XHJcbiAgcHVibGljIGFwaVVybCA9IFwiXCI7XHJcbiAgIFxyXG4gICAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgdGVzdEJlZDogVGVzdEJlZCB8IG51bGwpIHtcclxuICAgICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5hcGlVcmwgPSBlbnZpcm9ubWVudC5hcGlVcmw7XHJcbiAgICAgICAgICAgIHRoaXMuYXBpVXJsID0gZW52aXJvbm1lbnRUZXN0LmFwaVVybDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGVzdEJlZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmFwaVVybCA9IGVudmlyb25tZW50VGVzdC5hcGlVcmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFwaVVybCA9IGVudmlyb25tZW50UHJvZC5hcGlVcmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==