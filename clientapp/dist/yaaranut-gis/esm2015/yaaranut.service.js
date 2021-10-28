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
            alert("isDevMode");
            this.apiUrl = environment.apiUrl;
        }
        else if (testBed !== null) {
            alert("testBed");
            this.apiUrl = environmentTest.apiUrl;
        }
        else {
            alert("Prod");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFhcmFudXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL0xpYnJhcnlzL3NyYy95YWFyYW51dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7O0FBR2xFLE1BQU0sT0FBTyxlQUFlO0lBR3hCLFlBQXdCLE9BQXVCO1FBRjFDLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFHYixJQUFJLFNBQVMsRUFBRSxFQUFFO1lBQ2IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztTQUNwQzthQUNJLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUN2QixLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDO1NBQ3hDO2FBQ0k7WUFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUM7U0FDeEM7SUFFTCxDQUFDOzs0R0FqQlEsZUFBZTtnSEFBZixlQUFlOzJGQUFmLGVBQWU7a0JBRDNCLFVBQVU7OzBCQUlNLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBpc0Rldk1vZGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRlc3RCZWQgfSBmcm9tICdAYW5ndWxhci9jb3JlL3Rlc3RpbmcnO1xyXG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcclxuaW1wb3J0IHsgZW52aXJvbm1lbnRUZXN0IH0gZnJvbSAnLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQudGVzdCc7XHJcbmltcG9ydCB7IGVudmlyb25tZW50UHJvZCB9IGZyb20gJy4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50LnByb2QnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgWWFhcmFudXRTZXJ2aWNlIHtcclxuICBwdWJsaWMgYXBpVXJsID0gXCJcIjtcclxuICAgXHJcbiAgICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSB0ZXN0QmVkOiBUZXN0QmVkIHwgbnVsbCkge1xyXG4gICAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xyXG4gICAgICAgICAgICBhbGVydChcImlzRGV2TW9kZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5hcGlVcmwgPSBlbnZpcm9ubWVudC5hcGlVcmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRlc3RCZWQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJ0ZXN0QmVkXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmFwaVVybCA9IGVudmlyb25tZW50VGVzdC5hcGlVcmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcIlByb2RcIik7XHJcbiAgICAgICAgICAgIHRoaXMuYXBpVXJsID0gZW52aXJvbm1lbnRQcm9kLmFwaVVybDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuIl19