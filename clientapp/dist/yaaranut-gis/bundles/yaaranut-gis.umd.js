(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('yaaranut-gis', ['exports', '@angular/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['yaaranut-gis'] = {}, global.ng.core));
}(this, (function (exports, i0) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);

    var YaaranutGisService = /** @class */ (function () {
        function YaaranutGisService() {
        }
        return YaaranutGisService;
    }());
    YaaranutGisService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0__namespace, type: YaaranutGisService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    YaaranutGisService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0__namespace, type: YaaranutGisService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0__namespace, type: YaaranutGisService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return []; } });

    var YaaranutGisComponent = /** @class */ (function () {
        function YaaranutGisComponent() {
        }
        YaaranutGisComponent.prototype.ngOnInit = function () {
        };
        return YaaranutGisComponent;
    }());
    YaaranutGisComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0__namespace, type: YaaranutGisComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    YaaranutGisComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.2", type: YaaranutGisComponent, selector: "lib-yaaranutGis", ngImport: i0__namespace, template: "\n    <p>\n      yaaranut-gis works!!!!!!!!!\n    </p>\n  ", isInline: true });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0__namespace, type: YaaranutGisComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'lib-yaaranutGis',
                        template: "\n    <p>\n      yaaranut-gis works!!!!!!!!!\n    </p>\n  ",
                        styles: []
                    }]
            }], ctorParameters: function () { return []; } });

    var YaaranutGisModule = /** @class */ (function () {
        function YaaranutGisModule() {
        }
        return YaaranutGisModule;
    }());
    YaaranutGisModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0__namespace, type: YaaranutGisModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    YaaranutGisModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0__namespace, type: YaaranutGisModule, declarations: [YaaranutGisComponent], exports: [YaaranutGisComponent] });
    YaaranutGisModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0__namespace, type: YaaranutGisModule, imports: [[]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0__namespace, type: YaaranutGisModule, decorators: [{
                type: i0.NgModule,
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

    exports.YaaranutGisComponent = YaaranutGisComponent;
    exports.YaaranutGisModule = YaaranutGisModule;
    exports.YaaranutGisService = YaaranutGisService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=yaaranut-gis.umd.js.map
