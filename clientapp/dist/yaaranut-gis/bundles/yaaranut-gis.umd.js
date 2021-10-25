(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@arcgis/core/WebMap'), require('@arcgis/core/views/MapView'), require('@arcgis/core/layers/FeatureLayer'), require('@arcgis/core/Basemap'), require('@arcgis/core/layers/support/LabelClass'), require('@arcgis/core/symbols'), require('@arcgis/core/Color'), require('@arcgis/core/renderers/SimpleRenderer'), require('@angular/platform-browser'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('yaaranut-gis', ['exports', '@angular/core', '@arcgis/core/WebMap', '@arcgis/core/views/MapView', '@arcgis/core/layers/FeatureLayer', '@arcgis/core/Basemap', '@arcgis/core/layers/support/LabelClass', '@arcgis/core/symbols', '@arcgis/core/Color', '@arcgis/core/renderers/SimpleRenderer', '@angular/platform-browser', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['yaaranut-gis'] = {}, global.ng.core, global.WebMap, global.MapView, global.FeatureLayer, global.Basemap, global.LabelClass, global.symbols, global.Color, global.SimpleRenderer, global.ng.platformBrowser, global.ng.forms));
}(this, (function (exports, i0, WebMap, MapView, FeatureLayer, Basemap, LabelClass, symbols, Color, SimpleRenderer, platformBrowser, forms) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

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
    var WebMap__default = /*#__PURE__*/_interopDefaultLegacy(WebMap);
    var MapView__default = /*#__PURE__*/_interopDefaultLegacy(MapView);
    var FeatureLayer__default = /*#__PURE__*/_interopDefaultLegacy(FeatureLayer);
    var Basemap__default = /*#__PURE__*/_interopDefaultLegacy(Basemap);
    var LabelClass__default = /*#__PURE__*/_interopDefaultLegacy(LabelClass);
    var Color__default = /*#__PURE__*/_interopDefaultLegacy(Color);
    var SimpleRenderer__default = /*#__PURE__*/_interopDefaultLegacy(SimpleRenderer);

    // This file can be replaced during build by using the `fileReplacements` array.
    // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
    // The list of file replacements can be found in `angular.json`.
    var environment = {
        production: false,
        apiUrl: 'http://localhost:27552',
    };
    /*
     * For easier debugging in development mode, you can import the following file
     * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
     *
     * This import should be commented out in production mode because it will have a negative impact
     * on performance if an error is thrown.
     */
    // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

    var YaaranutService = /** @class */ (function () {
        function YaaranutService() {
            this.apiUrl = "";
            this.apiUrl = environment.apiUrl;
        }
        return YaaranutService;
    }());
    YaaranutService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: YaaranutService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    YaaranutService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: YaaranutService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: YaaranutService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return []; } });

    var WorkUnitService = /** @class */ (function () {
        function WorkUnitService() {
        }
        return WorkUnitService;
    }());
    WorkUnitService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: WorkUnitService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    WorkUnitService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: WorkUnitService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: WorkUnitService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return []; } });

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var WorkUnitComponent = /** @class */ (function () {
        function WorkUnitComponent(ys) {
            this.ys = ys;
            this.mapLoaded = new i0.EventEmitter();
            this._workUnits = [];
            this.firstTime = true;
            this._z = "z";
            this.featerLayer = new FeatureLayer__default['default']();
            this.mapView = new MapView__default['default']();
        }
        Object.defineProperty(WorkUnitComponent.prototype, "content", {
            set: function (content) {
                if (content) {
                    this.mapViewEl = content;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WorkUnitComponent.prototype, "zz", {
            get: function () {
                return this._z;
            },
            set: function (zzz) {
                this._z = zzz;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WorkUnitComponent.prototype, "workUnits", {
            get: function () {
                return this._workUnits;
            },
            set: function (workUnits) {
                var _this = this;
                this._workUnits = workUnits;
                if (this.firstTime) {
                    this.firstTime = false;
                    this.initializeMap();
                }
                var WorkUnitsWhere = workUnits.map(function (workUnit) { return "'" + workUnit + "'"; }).
                    join();
                this.featerLayer.definitionExpression = "GlobalID in (" + WorkUnitsWhere + ")";
                this.featerLayer.when(function () {
                    var query = _this.featerLayer.createQuery();
                    query.outSpatialReference = _this.mapView.spatialReference;
                    _this.featerLayer.queryFeatures().then(function (response) {
                        response.features.forEach(function (feature) {
                            var axzz = "Dfgd";
                        });
                    });
                    _this.featerLayer.queryExtent(query)
                        .then(function (response) {
                        if (response.extent !== null) {
                            response.extent.spatialReference = _this.mapView.spatialReference;
                            _this.mapView.goTo(response.extent).catch(function (error) { console.error(error); });
                        }
                        var EsriPwoerByelements = document.getElementsByClassName("esri-ui calcite-theme-light");
                        //EsriPwoerByelements[0].setAttribute("style","display:none");           
                        for (var i = 0; i < EsriPwoerByelements.length; i++) {
                            EsriPwoerByelements[i].setAttribute("style", "display:none");
                        }
                    });
                });
            },
            enumerable: false,
            configurable: true
        });
        WorkUnitComponent.prototype.initializeMap = function () {
            return __awaiter(this, void 0, void 0, function () {
                var webMap, basemap, featerRenderer, polygonsSimpleFillSymbol, labelClass;
                return __generator(this, function (_a) {
                    webMap = new WebMap__default['default']({
                        basemap: "topo",
                        //portalItem: {
                        //  //url:"https://services2.arcgis.com/utNNrmXb4IZOLXXs/ArcGIS/rest/services/JNFILForest/FeatureServer/0/query"
                        //  id: "streets"
                        //}
                    });
                    basemap = new Basemap__default['default']({
                        portalItem: {
                            //url:""
                            id: "streets" // WGS84 Streets Vector webmap
                        }
                    });
                    try {
                        // this.featerLayer = new FeatureLayer({ url: "http://localhost:27552/utNNrmXb4IZOLXXs/ArcGIS/rest/services/Test_KKLForestManagementUnits/FeatureServer/0/query" });
                        this.featerLayer = new FeatureLayer__default['default']({
                            url: this.ys.apiUrl + "/ArcGIS/rest/services/KKLForestManagementUnits/FeatureServer/0"
                        });
                        this.featerLayer.opacity = 0.5;
                        this.featerLayer.definitionExpression = "1=2";
                        featerRenderer = new SimpleRenderer__default['default']();
                        featerRenderer.label = "{FOR_NO}";
                        polygonsSimpleFillSymbol = new symbols.SimpleFillSymbol();
                        polygonsSimpleFillSymbol.color = Color__default['default'].fromString("gold");
                        polygonsSimpleFillSymbol.outline.color = Color__default['default'].fromString("blue");
                        polygonsSimpleFillSymbol.outline.width = 2;
                        featerRenderer.symbol = polygonsSimpleFillSymbol;
                        labelClass = new LabelClass__default['default']();
                        labelClass.labelExpressionInfo = { expression: "$feature.FOR_NO  " };
                        this.featerLayer.labelingInfo = [labelClass];
                        this.featerLayer.renderer = featerRenderer;
                        webMap.add(this.featerLayer);
                        this.mapView.container = this.mapViewEl.nativeElement;
                        this.mapView.map = webMap;
                        //(await mapView.whenLayerView(featerLayer)).filter.where = "GlobalID = '" + this._filter[0] + "'";
                        //mapView.when(() => {
                        //  this.mapLoaded.emit(true);
                        //});
                    }
                    catch (error) {
                        alert('We have an error: ' + error);
                    }
                    return [2 /*return*/];
                });
            });
        };
        WorkUnitComponent.prototype.ngOnInit = function () {
        };
        return WorkUnitComponent;
    }());
    WorkUnitComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: WorkUnitComponent, deps: [{ token: YaaranutService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    WorkUnitComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.3", type: WorkUnitComponent, selector: "YaaranutGis-workUnit", inputs: { zz: "zz", workUnits: "workUnits" }, outputs: { mapLoaded: "mapLoaded" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["mapViewNode"], descendants: true, static: true }], ngImport: i0__namespace, template: "11111\n  <div #mapViewNode style=\"width:100%;height: 100%;background-color:yellow\"></div>\n  ", isInline: true });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: WorkUnitComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'YaaranutGis-workUnit',
                        template: "11111\n  <div #mapViewNode style=\"width:100%;height: 100%;background-color:yellow\"></div>\n  ",
                        styles: []
                    }]
            }], ctorParameters: function () { return [{ type: YaaranutService }]; }, propDecorators: { content: [{
                    type: i0.ViewChild,
                    args: ['mapViewNode', { static: true }]
                }], mapLoaded: [{
                    type: i0.Output
                }], zz: [{
                    type: i0.Input
                }], workUnits: [{
                    type: i0.Input
                }] } });

    var WorkUnitModule = /** @class */ (function () {
        function WorkUnitModule() {
        }
        return WorkUnitModule;
    }());
    WorkUnitModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: WorkUnitModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    WorkUnitModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: WorkUnitModule, declarations: [WorkUnitComponent], imports: [forms.FormsModule,
            platformBrowser.BrowserModule], exports: [WorkUnitComponent] });
    WorkUnitModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: WorkUnitModule, imports: [[
                forms.FormsModule,
                platformBrowser.BrowserModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: WorkUnitModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            WorkUnitComponent
                        ],
                        imports: [
                            forms.FormsModule,
                            platformBrowser.BrowserModule
                        ],
                        exports: [
                            WorkUnitComponent
                        ],
                        schemas: [i0.CUSTOM_ELEMENTS_SCHEMA]
                    }]
            }] });

    var SeedsCollectService = /** @class */ (function () {
        function SeedsCollectService() {
        }
        return SeedsCollectService;
    }());
    SeedsCollectService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: SeedsCollectService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    SeedsCollectService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: SeedsCollectService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: SeedsCollectService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return []; } });

    var SeedsCollectComponent = /** @class */ (function () {
        function SeedsCollectComponent(ys) {
            this.ys = ys;
            this.mapLoaded = new i0.EventEmitter();
            this._SeedsCollects = [];
            this.firstTime = true;
            this.featerLayer = new FeatureLayer__default['default']();
            this.mapView = new MapView__default['default']();
        }
        Object.defineProperty(SeedsCollectComponent.prototype, "content", {
            set: function (content) {
                if (content) {
                    this.mapViewEl = content;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SeedsCollectComponent.prototype, "seedsCollects", {
            get: function () {
                return this._SeedsCollects;
            },
            set: function (SeedsCollects) {
                var _this = this;
                this._SeedsCollects = SeedsCollects;
                if (this.firstTime) {
                    this.firstTime = false;
                    this.initializeMap();
                }
                var SeedsCollectsWhere = "";
                this._SeedsCollects.forEach(function (SeedsCollect) { return SeedsCollectsWhere += "GlobalID_2 ='" + SeedsCollect + "' or "; });
                SeedsCollectsWhere += "1=2";
                this.featerLayer.definitionExpression = SeedsCollectsWhere;
                this.featerLayer.when(function () {
                    var query = _this.featerLayer.createQuery();
                    query.outSpatialReference = _this.mapView.spatialReference;
                    _this.featerLayer.queryFeatures().then(function (response) {
                        response.features.forEach(function (feature) {
                            var axzz = "Dfgd";
                        });
                    });
                    _this.featerLayer.queryExtent(query)
                        .then(function (response) {
                        if (response.extent !== null) {
                            response.extent.spatialReference = _this.mapView.spatialReference;
                            _this.mapView.goTo(response.extent).catch(function (error) { console.error(error); });
                        }
                        var EsriPwoerByelements = document.getElementsByClassName("esri-ui calcite-theme-light");
                        for (var i = 0; i < EsriPwoerByelements.length; i++) {
                            EsriPwoerByelements[i].setAttribute("style", "display:none");
                        }
                    });
                });
            },
            enumerable: false,
            configurable: true
        });
        SeedsCollectComponent.prototype.initializeMap = function () {
            return __awaiter(this, void 0, void 0, function () {
                var webMap, basemap, featerRenderer, polygonsSimpleFillSymbol, labelClass;
                return __generator(this, function (_a) {
                    webMap = new WebMap__default['default']({
                        basemap: "topo",
                        //portalItem: {
                        //  //url:"https://services2.arcgis.com/utNNrmXb4IZOLXXs/ArcGIS/rest/services/JNFILForest/FeatureServer/0/query"
                        //  id: "streets"
                        //}
                    });
                    basemap = new Basemap__default['default']({
                        portalItem: {
                        //url:""
                        //id: "streets"  // WGS84 Streets Vector webmap
                        }
                    });
                    try {
                        //esriConfig.apiKey = "AAPK9a3f55c380f94d1bb10a7566c7b32f941X_pcZKXmWY7Grjs6oA9AqufsDHrvRDYaOlUG8gvyD5fhZv-OGYyIgXEO-ihuO4T";
                        this.featerLayer = new FeatureLayer__default['default']({
                            url: this.ys.apiUrl + "/ArcGIS/rest/services/SeedCollect2021/FeatureServer/0"
                        });
                        this.featerLayer.opacity = 0.5;
                        this.featerLayer.definitionExpression = "1=2";
                        featerRenderer = new SimpleRenderer__default['default']();
                        featerRenderer.label = "{Site}";
                        polygonsSimpleFillSymbol = new symbols.SimpleFillSymbol();
                        polygonsSimpleFillSymbol.color = Color__default['default'].fromString("gold");
                        polygonsSimpleFillSymbol.outline.color = Color__default['default'].fromString("blue");
                        polygonsSimpleFillSymbol.outline.width = 2;
                        featerRenderer.symbol = polygonsSimpleFillSymbol;
                        labelClass = new LabelClass__default['default']();
                        labelClass.labelExpressionInfo = { expression: "$feature.Site + ',' +  $feature.HebNic " };
                        this.featerLayer.labelingInfo = [labelClass];
                        //this.featerLayer.renderer = featerRenderer;
                        webMap.add(this.featerLayer);
                        this.mapView.container = this.mapViewEl.nativeElement;
                        this.mapView.map = webMap;
                        //(await mapView.whenLayerView(featerLayer)).filter.where = "GlobalID = '" + this._filter[0] + "'";
                        //mapView.when(() => {
                        //  this.mapLoaded.emit(true);
                        //});
                    }
                    catch (error) {
                        alert('We have an error: ' + error);
                    }
                    return [2 /*return*/];
                });
            });
        };
        SeedsCollectComponent.prototype.ngOnInit = function () {
        };
        return SeedsCollectComponent;
    }());
    SeedsCollectComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: SeedsCollectComponent, deps: [{ token: YaaranutService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    SeedsCollectComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.3", type: SeedsCollectComponent, selector: "YaaranutGis-SeedsCollect", inputs: { seedsCollects: "seedsCollects" }, outputs: { mapLoaded: "mapLoaded" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["mapViewSeedsCollect"], descendants: true, static: true }], ngImport: i0__namespace, template: "\n    <div #mapViewSeedsCollect style=\"width:100%;height: 100%;background-color:green\"></div>\n  ", isInline: true });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: SeedsCollectComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'YaaranutGis-SeedsCollect',
                        template: "\n    <div #mapViewSeedsCollect style=\"width:100%;height: 100%;background-color:green\"></div>\n  ",
                        styles: []
                    }]
            }], ctorParameters: function () { return [{ type: YaaranutService }]; }, propDecorators: { content: [{
                    type: i0.ViewChild,
                    args: ['mapViewSeedsCollect', { static: true }]
                }], mapLoaded: [{
                    type: i0.Output
                }], seedsCollects: [{
                    type: i0.Input
                }] } });

    var SeedsCollectModule = /** @class */ (function () {
        function SeedsCollectModule() {
        }
        return SeedsCollectModule;
    }());
    SeedsCollectModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: SeedsCollectModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    SeedsCollectModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: SeedsCollectModule, declarations: [SeedsCollectComponent], imports: [forms.FormsModule,
            platformBrowser.BrowserModule], exports: [SeedsCollectComponent] });
    SeedsCollectModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: SeedsCollectModule, imports: [[
                forms.FormsModule,
                platformBrowser.BrowserModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: SeedsCollectModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            SeedsCollectComponent
                        ],
                        imports: [
                            forms.FormsModule,
                            platformBrowser.BrowserModule
                        ],
                        exports: [
                            SeedsCollectComponent
                        ],
                        schemas: [i0.CUSTOM_ELEMENTS_SCHEMA]
                    }]
            }] });

    /*
     * Public API Surface of work-unit
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.SeedsCollectComponent = SeedsCollectComponent;
    exports.SeedsCollectModule = SeedsCollectModule;
    exports.SeedsCollectService = SeedsCollectService;
    exports.WorkUnitComponent = WorkUnitComponent;
    exports.WorkUnitModule = WorkUnitModule;
    exports.WorkUnitService = WorkUnitService;
    exports.YaaranutService = YaaranutService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=yaaranut-gis.umd.js.map
