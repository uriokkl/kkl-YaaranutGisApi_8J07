import * as i0 from '@angular/core';
import { Injectable, Component, NgModule } from '@angular/core';

class YaaranutGisService {
    constructor() { }
}
YaaranutGisService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0, type: YaaranutGisService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
YaaranutGisService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0, type: YaaranutGisService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0, type: YaaranutGisService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class YaaranutGisComponent {
    constructor() { }
    ngOnInit() {
    }
}
YaaranutGisComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0, type: YaaranutGisComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
YaaranutGisComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.2", type: YaaranutGisComponent, selector: "lib-yaaranutGis", ngImport: i0, template: `
    <p>
      yaaranut-gis works!!!!!!!!!
    </p>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0, type: YaaranutGisComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'lib-yaaranutGis',
                    template: `
    <p>
      yaaranut-gis works!!!!!!!!!
    </p>
  `,
                    styles: []
                }]
        }], ctorParameters: function () { return []; } });

class YaaranutGisModule {
}
YaaranutGisModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0, type: YaaranutGisModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
YaaranutGisModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0, type: YaaranutGisModule, declarations: [YaaranutGisComponent], exports: [YaaranutGisComponent] });
YaaranutGisModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0, type: YaaranutGisModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0, type: YaaranutGisModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        YaaranutGisComponent
                    ],
                    imports: [],
                    exports: [
                        YaaranutGisComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of yaaranut-gis
 */

/**
 * Generated bundle index. Do not edit.
 */

export { YaaranutGisComponent, YaaranutGisModule, YaaranutGisService };
//# sourceMappingURL=yaaranut-gis.js.map
