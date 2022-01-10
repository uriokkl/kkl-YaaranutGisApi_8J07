import * as i0 from '@angular/core';
import { isDevMode, Injectable, Optional, EventEmitter, Component, ViewChild, Output, Input, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as i1 from '@angular/core/testing';
import { __awaiter } from 'tslib';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Basemap from '@arcgis/core/Basemap';
import LabelClass from '@arcgis/core/layers/support/LabelClass';
import { SimpleFillSymbol } from '@arcgis/core/symbols';
import Color from '@arcgis/core/Color';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
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

const environmentTest = {
    production: false,
    apiUrl: 'https://kkl-yaaranutgisapi.azurewebsites.net',
};

const environmentProd = {
    production: true,
    apiUrl: 'https://kkl-yaaranutgisapi.azurewebsites.net',
};

class YaaranutService {
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

class WorkUnitService {
    constructor() { }
}
WorkUnitService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: WorkUnitService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
WorkUnitService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: WorkUnitService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: WorkUnitService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class WorkUnitComponent {
    constructor(ys) {
        this.ys = ys;
        this.mapLoaded = new EventEmitter();
        this._workUnits = [];
        this.firstTime = true;
        this._z = "z";
        this.featerLayer = new FeatureLayer();
        this.mapView = new MapView();
    }
    set content(content) {
        if (content) {
            this.mapViewEl = content;
        }
    }
    set zz(zzz) {
        this._z = zzz;
    }
    get zz() {
        return this._z;
    }
    set workUnits(workUnits) {
        this._workUnits = workUnits;
        if (this.firstTime) {
            this.firstTime = false;
            this.initializeMap();
        }
        const WorkUnitsWhere = workUnits.map(workUnit => "'" + workUnit + "'").
            join();
        this.featerLayer.definitionExpression = "GlobalID in (" + WorkUnitsWhere + ")";
        this.featerLayer.when(() => {
            const query = this.featerLayer.createQuery();
            query.outSpatialReference = this.mapView.spatialReference;
            this.featerLayer.queryFeatures().then(response => {
                response.features.forEach(feature => {
                    const axzz = "Dfgd";
                });
            });
            this.featerLayer.queryExtent(query)
                .then(response => {
                if (response.extent !== null) {
                    response.extent.spatialReference = this.mapView.spatialReference;
                    this.mapView.goTo(response.extent).catch(function (error) { console.error(error); });
                }
                const EsriPwoerByelements = document.getElementsByClassName("esri-ui calcite-theme-light");
                //EsriPwoerByelements[0].setAttribute("style","display:none");           
                for (let i = 0; i < EsriPwoerByelements.length; i++) {
                    EsriPwoerByelements[i].setAttribute("style", "display:none");
                }
            });
        });
    }
    get workUnits() {
        return this._workUnits;
    }
    initializeMap() {
        return __awaiter(this, void 0, void 0, function* () {
            const webMap = new WebMap({
                basemap: "topo",
                //portalItem: {
                //  //url:"https://services2.arcgis.com/utNNrmXb4IZOLXXs/ArcGIS/rest/services/JNFILForest/FeatureServer/0/query"
                //  id: "streets"
                //}
            });
            let basemap = new Basemap({
                portalItem: {
                    //url:""
                    id: "streets" // WGS84 Streets Vector webmap
                }
            });
            try {
                // this.featerLayer = new FeatureLayer({ url: "http://localhost:27552/utNNrmXb4IZOLXXs/ArcGIS/rest/services/Test_KKLForestManagementUnits/FeatureServer/0/query" });
                this.featerLayer = new FeatureLayer({
                    url: this.ys.apiUrl + "/ArcGIS/rest/services/KKLForestManagementUnits/FeatureServer/0"
                });
                this.featerLayer.opacity = 0.5;
                this.featerLayer.definitionExpression = "1=2";
                //this.featerLayer.displayField = "FOR_NO";
                //this.featerLayer.labelsVisible = true;
                //this.featerLayer.legendEnabled = true;
                //this.featerLayer.outFields = ["FOR_NO"];
                //this.featerLayer.popupEnabled = true;
                const featerRenderer = new SimpleRenderer();
                featerRenderer.label = "{FOR_NO}";
                const polygonsSimpleFillSymbol = new SimpleFillSymbol();
                polygonsSimpleFillSymbol.color = Color.fromString("gold");
                polygonsSimpleFillSymbol.outline.color = Color.fromString("blue");
                polygonsSimpleFillSymbol.outline.width = 2;
                featerRenderer.symbol = polygonsSimpleFillSymbol;
                const labelClass = new LabelClass();
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
                console.error(error);
                alert('We have an error: ' + error);
            }
        });
    }
    ngOnInit() {
    }
}
WorkUnitComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: WorkUnitComponent, deps: [{ token: YaaranutService }], target: i0.ɵɵFactoryTarget.Component });
WorkUnitComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.3", type: WorkUnitComponent, selector: "YaaranutGis-workUnit", inputs: { zz: "zz", workUnits: "workUnits" }, outputs: { mapLoaded: "mapLoaded" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["mapViewNode"], descendants: true, static: true }], ngImport: i0, template: `
  <div #mapViewNode style="width:100%;height: 100%;background-color:white"></div>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: WorkUnitComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'YaaranutGis-workUnit',
                    template: `
  <div #mapViewNode style="width:100%;height: 100%;background-color:white"></div>
  `,
                    styles: []
                }]
        }], ctorParameters: function () { return [{ type: YaaranutService }]; }, propDecorators: { content: [{
                type: ViewChild,
                args: ['mapViewNode', { static: true }]
            }], mapLoaded: [{
                type: Output
            }], zz: [{
                type: Input
            }], workUnits: [{
                type: Input
            }] } });

class WorkUnitModule {
}
WorkUnitModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: WorkUnitModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
WorkUnitModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: WorkUnitModule, declarations: [WorkUnitComponent], imports: [FormsModule,
        //BrowserModule
        CommonModule], exports: [WorkUnitComponent] });
WorkUnitModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: WorkUnitModule, imports: [[
            FormsModule,
            //BrowserModule
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: WorkUnitModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        WorkUnitComponent
                    ],
                    imports: [
                        FormsModule,
                        //BrowserModule
                        CommonModule
                    ],
                    exports: [
                        WorkUnitComponent
                    ],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
                }]
        }] });

class SeedsCollectService {
    constructor() { }
}
SeedsCollectService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: SeedsCollectService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SeedsCollectService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: SeedsCollectService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: SeedsCollectService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class SeedsCollectComponent {
    constructor(ys) {
        this.ys = ys;
        this._SeedsCollects = [];
        this.firstTime = true;
        this.mapLoaded = new EventEmitter();
        this.featerLayer = new FeatureLayer();
        this.mapView = new MapView();
    }
    set content(content) {
        if (content) {
            this.mapViewEl = content;
        }
    }
    set seedsCollects(SeedsCollects) {
        this._SeedsCollects = SeedsCollects;
        if (this.firstTime) {
            this.firstTime = false;
            this.initializeMap();
        }
        let SeedsCollectsWhere = "";
        this._SeedsCollects.forEach(SeedsCollect => SeedsCollectsWhere += "GlobalID_2 ='" + SeedsCollect + "' or ");
        SeedsCollectsWhere += "1=2";
        this.featerLayer.definitionExpression = SeedsCollectsWhere;
        this.featerLayer.when(() => {
            const query = this.featerLayer.createQuery();
            query.outSpatialReference = this.mapView.spatialReference;
            this.featerLayer.queryFeatures().then(response => {
                response.features.forEach(feature => {
                    const axzz = "Dfgd";
                });
            });
            this.featerLayer.queryExtent(query)
                .then(response => {
                if (response.extent !== null) {
                    response.extent.spatialReference = this.mapView.spatialReference;
                    this.mapView.goTo(response.extent).catch(function (error) { console.error(error); });
                }
                var EsriPwoerByelements = document.getElementsByClassName("esri-ui calcite-theme-light");
                for (let i = 0; i < EsriPwoerByelements.length; i++) {
                    EsriPwoerByelements[i].setAttribute("style", "display:none");
                }
            });
        });
    }
    get seedsCollects() {
        return this._SeedsCollects;
    }
    initializeMap() {
        return __awaiter(this, void 0, void 0, function* () {
            const webMap = new WebMap({
                basemap: "topo",
                //portalItem: {
                //  //url:"https://services2.arcgis.com/utNNrmXb4IZOLXXs/ArcGIS/rest/services/JNFILForest/FeatureServer/0/query"
                //  id: "streets"
                //}
            });
            let basemap = new Basemap({
                portalItem: {
                //url:""
                //id: "streets"  // WGS84 Streets Vector webmap
                }
            });
            try {
                //esriConfig.apiKey = "AAPK9a3f55c380f94d1bb10a7566c7b32f941X_pcZKXmWY7Grjs6oA9AqufsDHrvRDYaOlUG8gvyD5fhZv-OGYyIgXEO-ihuO4T";
                this.featerLayer = new FeatureLayer({
                    url: this.ys.apiUrl + "/ArcGIS/rest/services/SeedCollect2021/FeatureServer/0/"
                });
                this.featerLayer.opacity = 0.5;
                this.featerLayer.definitionExpression = "1=2";
                //this.featerLayer.displayField = "FOR_NO";
                //this.featerLayer.labelsVisible = true;
                //this.featerLayer.legendEnabled = true;
                //this.featerLayer.outFields = ["FOR_NO"];
                //this.featerLayer.popupEnabled = true;
                const featerRenderer = new SimpleRenderer();
                featerRenderer.label = "{Site}";
                const polygonsSimpleFillSymbol = new SimpleFillSymbol();
                polygonsSimpleFillSymbol.color = Color.fromString("gold");
                polygonsSimpleFillSymbol.outline.color = Color.fromString("blue");
                polygonsSimpleFillSymbol.outline.width = 2;
                featerRenderer.symbol = polygonsSimpleFillSymbol;
                const labelClass = new LabelClass();
                labelClass.labelExpressionInfo = { expression: "$feature.Site + ', ' +  $feature.HebNic " };
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
                console.error(error);
                alert('We have an error: ' + error);
            }
        });
    }
    ngOnInit() {
    }
}
SeedsCollectComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: SeedsCollectComponent, deps: [{ token: YaaranutService }], target: i0.ɵɵFactoryTarget.Component });
SeedsCollectComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.3", type: SeedsCollectComponent, selector: "YaaranutGis-SeedsCollect", inputs: { seedsCollects: "seedsCollects" }, outputs: { mapLoaded: "mapLoaded" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["mapViewSeedsCollect"], descendants: true, static: true }], ngImport: i0, template: `
    <div #mapViewSeedsCollect style="width:100%;height: 100%;background-color:green"></div>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: SeedsCollectComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'YaaranutGis-SeedsCollect',
                    template: `
    <div #mapViewSeedsCollect style="width:100%;height: 100%;background-color:green"></div>
  `,
                    styles: []
                }]
        }], ctorParameters: function () { return [{ type: YaaranutService }]; }, propDecorators: { content: [{
                type: ViewChild,
                args: ['mapViewSeedsCollect', { static: true }]
            }], mapLoaded: [{
                type: Output
            }], seedsCollects: [{
                type: Input
            }] } });

class SeedsCollectModule {
}
SeedsCollectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: SeedsCollectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SeedsCollectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: SeedsCollectModule, declarations: [SeedsCollectComponent], imports: [FormsModule,
        //BrowserModule
        CommonModule], exports: [SeedsCollectComponent] });
SeedsCollectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: SeedsCollectModule, imports: [[
            FormsModule,
            //BrowserModule
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: SeedsCollectModule, decorators: [{
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

class ForestryTendersService {
    constructor() { }
}
ForestryTendersService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: ForestryTendersService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ForestryTendersService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: ForestryTendersService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: ForestryTendersService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class ForestryTendersComponent {
    constructor(ys) {
        this.ys = ys;
        this.featerLayer = new FeatureLayer();
        this.mapView = new MapView();
        this._ForestryTenders = [];
        this.firstTime = true;
        this.mapLoaded = new EventEmitter();
    }
    set content(content) { if (content) {
        this.mapViewEl = content;
    } }
    set ForestryTenders(ForestryTenders) {
        this._ForestryTenders = ForestryTenders;
        if (this.firstTime) {
            this.firstTime = false;
            this.initializeMap();
        }
        //let ForestryTendersWhere = ""        
        //this._ForestryTenders.forEach(
        //    ForestryTenders => {
        //        if (ForestryTendersWhere !== "") ForestryTendersWhere += " or ";
        //        ForestryTendersWhere += "GlobalID ='" + ForestryTenders + "'"
        //    }
        //);
        const ForestryTendersWhere = "GlobalID='" + this._ForestryTenders.join("' or GlobalID='") + "'";
        this.featerLayer.definitionExpression = ForestryTendersWhere;
        this.featerLayer.when(() => {
            const query = this.featerLayer.createQuery();
            query.outSpatialReference = this.mapView.spatialReference;
            this.featerLayer.queryExtent(query)
                .then(response => {
                if (response.extent !== null) {
                    response.extent.spatialReference = this.mapView.spatialReference;
                    this.mapView.goTo(response.extent).catch(function (error) { console.error(error); });
                }
                var EsriPwoerByelements = document.getElementsByClassName("esri-ui calcite-theme-light");
                for (let i = 0; i < EsriPwoerByelements.length; i++) {
                    EsriPwoerByelements[i].setAttribute("style", "display:none");
                }
            });
        });
    }
    get ForestryTenders() {
        return this._ForestryTenders;
    }
    initializeMap() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const webMap = new WebMap({
                    basemap: "topo",
                });
                const labelClass = new LabelClass();
                labelClass.labelExpressionInfo = { expression: "$feature.TenderName + ', ' +  $feature.SubTenderID + ', ' +  $feature.SubTenderYear " };
                this.featerLayer = new FeatureLayer({
                    url: this.ys.apiUrl + "/ArcGIS/rest/services/ForestryTenders/FeatureServer/1/"
                });
                this.featerLayer.opacity = 0.5;
                this.featerLayer.definitionExpression = "1=2";
                this.featerLayer.labelingInfo = [labelClass];
                const polygonsSimpleFillSymbol = new SimpleFillSymbol();
                polygonsSimpleFillSymbol.color = Color.fromString("blue");
                polygonsSimpleFillSymbol.outline.color = Color.fromString("blue");
                polygonsSimpleFillSymbol.outline.width = 2;
                const featerRenderer = new SimpleRenderer();
                featerRenderer.symbol = polygonsSimpleFillSymbol;
                featerRenderer.label = "{TenderName}";
                webMap.add(this.featerLayer);
                this.mapView.container = this.mapViewEl.nativeElement;
                this.mapView.map = webMap;
            }
            catch (error) {
                console.error(error);
                alert('We have an error: ' + error);
            }
        });
    }
    ngOnInit() { }
}
ForestryTendersComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: ForestryTendersComponent, deps: [{ token: YaaranutService }], target: i0.ɵɵFactoryTarget.Component });
ForestryTendersComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.3", type: ForestryTendersComponent, selector: "YaaranutGis-ForestryTenders", inputs: { ForestryTenders: "ForestryTenders" }, outputs: { mapLoaded: "mapLoaded" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["mapViewForestryTenders"], descendants: true, static: true }], ngImport: i0, template: `
    <div #mapViewForestryTenders style="width:100%;height: 100%;background-color:white"></div>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: ForestryTendersComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'YaaranutGis-ForestryTenders',
                    template: `
    <div #mapViewForestryTenders style="width:100%;height: 100%;background-color:white"></div>
  `,
                    styles: []
                }]
        }], ctorParameters: function () { return [{ type: YaaranutService }]; }, propDecorators: { content: [{
                type: ViewChild,
                args: ['mapViewForestryTenders', { static: true }]
            }], mapLoaded: [{
                type: Output
            }], ForestryTenders: [{
                type: Input
            }] } });

class ForestryTendersModule {
}
ForestryTendersModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: ForestryTendersModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ForestryTendersModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: ForestryTendersModule, declarations: [ForestryTendersComponent], imports: [FormsModule,
        //BrowserModule
        CommonModule], exports: [ForestryTendersComponent] });
ForestryTendersModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: ForestryTendersModule, imports: [[
            FormsModule,
            //BrowserModule
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: ForestryTendersModule, decorators: [{
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

/*
 * Public API Surface of work-unit
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ForestryTendersComponent, ForestryTendersModule, ForestryTendersService, SeedsCollectComponent, SeedsCollectModule, SeedsCollectService, WorkUnitComponent, WorkUnitModule, WorkUnitService, YaaranutService };
//# sourceMappingURL=yaaranut-gis.js.map
