import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Basemap from "@arcgis/core/Basemap";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import { SimpleFillSymbol } from '@arcgis/core/symbols';
import Color from '@arcgis/core/Color';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import * as i0 from "@angular/core";
import * as i1 from "../yaaranut.service";
export class SeedsCollectComponent {
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
    async initializeMap() {
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
    }
    ngOnInit() {
    }
}
SeedsCollectComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: SeedsCollectComponent, deps: [{ token: i1.YaaranutService }], target: i0.ɵɵFactoryTarget.Component });
SeedsCollectComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: SeedsCollectComponent, selector: "YaaranutGis-SeedsCollect", inputs: { seedsCollects: "seedsCollects" }, outputs: { mapLoaded: "mapLoaded" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["mapViewSeedsCollect"], descendants: true, static: true }], ngImport: i0, template: `
    <div #mapViewSeedsCollect style="width:100%;height: 100%;background-color:green"></div>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: SeedsCollectComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'YaaranutGis-SeedsCollect',
                    template: `
    <div #mapViewSeedsCollect style="width:100%;height: 100%;background-color:green"></div>
  `,
                    styles: []
                }]
        }], ctorParameters: function () { return [{ type: i1.YaaranutService }]; }, propDecorators: { content: [{
                type: ViewChild,
                args: ['mapViewSeedsCollect', { static: true }]
            }], mapLoaded: [{
                type: Output
            }], seedsCollects: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZHMtY29sbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9MaWJyYXJ5cy9zcmMvbGliL3NlZWRzLWNvbGxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRHLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sT0FBTyxNQUFNLDRCQUE0QixDQUFDO0FBRWpELE9BQU8sWUFBWSxNQUFNLGtDQUFrQyxDQUFDO0FBQzVELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBZ0MsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RixPQUFPLEtBQUssTUFBTSxvQkFBb0IsQ0FBQztBQUN2QyxPQUFPLGNBQWMsTUFBTSx1Q0FBdUMsQ0FBQzs7O0FBV25FLE1BQU0sT0FBTyxxQkFBcUI7SUF5RGhDLFlBQW9CLEVBQW1CO1FBQW5CLE9BQUUsR0FBRixFQUFFLENBQWlCO1FBdEQvQixtQkFBYyxHQUFlLEVBQUUsQ0FBQztRQUNoQyxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBS2YsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUE4QzNDLGdCQUFXLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0MsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFJL0IsQ0FBQztJQXRERCxJQUF3RCxPQUFPLENBQUMsT0FBbUI7UUFDakYsSUFBSSxPQUFPLEVBQUU7WUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztTQUFFO0lBQzVDLENBQUM7SUFJRCxJQUNJLGFBQWEsQ0FBQyxhQUF1QjtRQUV2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LG9CQUFvQixHQUFHLEtBQUssQ0FBQyxDQUFDO1NBQ3JDO0lBRUgsQ0FBQztJQUVELFFBQVE7SUFHUixDQUFDOztrSEEzSFUscUJBQXFCO3NHQUFyQixxQkFBcUIsK1FBTnRCOztHQUVUOzJGQUlVLHFCQUFxQjtrQkFSakMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxRQUFRLEVBQUU7O0dBRVQ7b0JBQ0QsTUFBTSxFQUFFLEVBQ1A7aUJBQ0Y7c0dBT3lELE9BQU87c0JBQTlELFNBQVM7dUJBQUMscUJBQXFCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUd4QyxTQUFTO3NCQUFsQixNQUFNO2dCQUlILGFBQWE7c0JBRGhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IFdlYk1hcCBmcm9tIFwiQGFyY2dpcy9jb3JlL1dlYk1hcFwiO1xuaW1wb3J0IE1hcFZpZXcgZnJvbSBcIkBhcmNnaXMvY29yZS92aWV3cy9NYXBWaWV3XCI7XG5pbXBvcnQgZXNyaUNvbmZpZyBmcm9tIFwiQGFyY2dpcy9jb3JlL2NvbmZpZ1wiO1xuaW1wb3J0IEZlYXR1cmVMYXllciBmcm9tIFwiQGFyY2dpcy9jb3JlL2xheWVycy9GZWF0dXJlTGF5ZXJcIjtcbmltcG9ydCBCYXNlbWFwIGZyb20gXCJAYXJjZ2lzL2NvcmUvQmFzZW1hcFwiO1xuaW1wb3J0IExhYmVsQ2xhc3MgZnJvbSBcIkBhcmNnaXMvY29yZS9sYXllcnMvc3VwcG9ydC9MYWJlbENsYXNzXCI7XG5pbXBvcnQgeyBTaW1wbGVGaWxsU3ltYm9sLCBTaW1wbGVMaW5lU3ltYm9sLCBUZXh0U3ltYm9sIH0gZnJvbSAnQGFyY2dpcy9jb3JlL3N5bWJvbHMnO1xuaW1wb3J0IENvbG9yIGZyb20gJ0BhcmNnaXMvY29yZS9Db2xvcic7XG5pbXBvcnQgU2ltcGxlUmVuZGVyZXIgZnJvbSAnQGFyY2dpcy9jb3JlL3JlbmRlcmVycy9TaW1wbGVSZW5kZXJlcic7XG5pbXBvcnQgeyBZYWFyYW51dFNlcnZpY2UgfSBmcm9tICcuLi95YWFyYW51dC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1lhYXJhbnV0R2lzLVNlZWRzQ29sbGVjdCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAjbWFwVmlld1NlZWRzQ29sbGVjdCBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OiAxMDAlO2JhY2tncm91bmQtY29sb3I6Z3JlZW5cIj48L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gIF0gICBcbn0pXG5leHBvcnQgY2xhc3MgU2VlZHNDb2xsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwcml2YXRlIG1hcFZpZXdFbCE6IEVsZW1lbnRSZWY7XG4gIHByaXZhdGUgX1NlZWRzQ29sbGVjdHM6IHN0cmluZ1tdID0gICBbXTtcbiAgcHJpdmF0ZSBmaXJzdFRpbWUgPSB0cnVlO1xuXG4gIEBWaWV3Q2hpbGQoJ21hcFZpZXdTZWVkc0NvbGxlY3QnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXQgY29udGVudChjb250ZW50OiBFbGVtZW50UmVmKSB7XG4gICAgaWYgKGNvbnRlbnQpIHsgdGhpcy5tYXBWaWV3RWwgPSBjb250ZW50OyB9XG4gIH1cbiAgQE91dHB1dCgpIG1hcExvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgXG4gICAgXG4gIEBJbnB1dCgpXG4gIHNldCBzZWVkc0NvbGxlY3RzKFNlZWRzQ29sbGVjdHM6IHN0cmluZ1tdKSB7XG4gICAgIFxuICAgIHRoaXMuX1NlZWRzQ29sbGVjdHMgPSBTZWVkc0NvbGxlY3RzO1xuICAgXG4gICAgaWYgKHRoaXMuZmlyc3RUaW1lKSB7XG4gICAgICB0aGlzLmZpcnN0VGltZSA9IGZhbHNlO1xuICAgICAgdGhpcy5pbml0aWFsaXplTWFwKCk7XG4gICAgfVxuICAgIGxldCBTZWVkc0NvbGxlY3RzV2hlcmUgPVwiXCJcbiAgICB0aGlzLl9TZWVkc0NvbGxlY3RzLmZvckVhY2goXG4gICAgICBTZWVkc0NvbGxlY3QgPT5cbiAgICAgICAgU2VlZHNDb2xsZWN0c1doZXJlICs9IFwiR2xvYmFsSURfMiA9J1wiICsgU2VlZHNDb2xsZWN0ICsgXCInIG9yIFwiXG4gICAgKTtcbiAgICBTZWVkc0NvbGxlY3RzV2hlcmUgKz0gXCIxPTJcIlxuICAgIHRoaXMuZmVhdGVyTGF5ZXIuZGVmaW5pdGlvbkV4cHJlc3Npb24gPSAgU2VlZHNDb2xsZWN0c1doZXJlICA7ICAgICBcbiAgICB0aGlzLmZlYXRlckxheWVyLndoZW4oXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5mZWF0ZXJMYXllci5jcmVhdGVRdWVyeSgpO1xuICAgICAgICBxdWVyeS5vdXRTcGF0aWFsUmVmZXJlbmNlID0gdGhpcy5tYXBWaWV3LnNwYXRpYWxSZWZlcmVuY2U7XG4gICAgICAgIHRoaXMuZmVhdGVyTGF5ZXIucXVlcnlGZWF0dXJlcygpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHJlc3BvbnNlLmZlYXR1cmVzLmZvckVhY2goZmVhdHVyZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBheHp6ID0gXCJEZmdkXCI7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZlYXRlckxheWVyLnF1ZXJ5RXh0ZW50KHF1ZXJ5KVxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5leHRlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmVzcG9uc2UuZXh0ZW50LnNwYXRpYWxSZWZlcmVuY2UgPSB0aGlzLm1hcFZpZXcuc3BhdGlhbFJlZmVyZW5jZTtcbiAgICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmdvVG8ocmVzcG9uc2UuZXh0ZW50KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHsgY29uc29sZS5lcnJvcihlcnJvcik7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIEVzcmlQd29lckJ5ZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZXNyaS11aSBjYWxjaXRlLXRoZW1lLWxpZ2h0XCIpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBFc3JpUHdvZXJCeWVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7ICBcbiAgICAgICAgICAgICAgRXNyaVB3b2VyQnllbGVtZW50c1tpXS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImRpc3BsYXk6bm9uZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgfSk7XG4gIH1cbiAgZ2V0IHNlZWRzQ29sbGVjdHMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9TZWVkc0NvbGxlY3RzO1xuICB9XG5cbiAgcHVibGljIGZlYXRlckxheWVyOiBGZWF0dXJlTGF5ZXIgPSBuZXcgRmVhdHVyZUxheWVyKCk7XG4gIHB1YmxpYyBtYXBWaWV3ID0gbmV3IE1hcFZpZXcoKTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB5czogWWFhcmFudXRTZXJ2aWNlKSB7XG5cblxuICB9XG5cbiAgYXN5bmMgaW5pdGlhbGl6ZU1hcCgpIHtcbiAgICBjb25zdCB3ZWJNYXAgPSBuZXcgV2ViTWFwKHtcbiAgICAgIGJhc2VtYXA6IFwidG9wb1wiLFxuICAgICAgLy9wb3J0YWxJdGVtOiB7XG4gICAgICAvLyAgLy91cmw6XCJodHRwczovL3NlcnZpY2VzMi5hcmNnaXMuY29tL3V0Tk5ybVhiNElaT0xYWHMvQXJjR0lTL3Jlc3Qvc2VydmljZXMvSk5GSUxGb3Jlc3QvRmVhdHVyZVNlcnZlci8wL3F1ZXJ5XCJcbiAgICAgIC8vICBpZDogXCJzdHJlZXRzXCJcbiAgICAgIC8vfVxuICAgIH0pO1xuICAgIGxldCBiYXNlbWFwID0gbmV3IEJhc2VtYXAoe1xuICAgICAgcG9ydGFsSXRlbToge1xuICAgICAgICAvL3VybDpcIlwiXG4gICAgICAgIC8vaWQ6IFwic3RyZWV0c1wiICAvLyBXR1M4NCBTdHJlZXRzIFZlY3RvciB3ZWJtYXBcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICAvL2VzcmlDb25maWcuYXBpS2V5ID0gXCJBQVBLOWEzZjU1YzM4MGY5NGQxYmIxMGE3NTY2YzdiMzJmOTQxWF9wY1pLWG1XWTdHcmpzNm9BOUFxdWZzREhydlJEWWFPbFVHOGd2eUQ1Zmhadi1PR1l5SWdYRU8taWh1TzRUXCI7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmZlYXRlckxheWVyID0gbmV3IEZlYXR1cmVMYXllcih7XHJcbiAgICAgICAgICAgIHVybDogdGhpcy55cy5hcGlVcmwgKyBcIi9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9TZWVkQ29sbGVjdDIwMjEvRmVhdHVyZVNlcnZlci8wL1wiXHJcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgdGhpcy5mZWF0ZXJMYXllci5vcGFjaXR5ID0gMC41O1xuICAgICAgdGhpcy5mZWF0ZXJMYXllci5kZWZpbml0aW9uRXhwcmVzc2lvbiA9IFwiMT0yXCI7XG4gICAgICAvL3RoaXMuZmVhdGVyTGF5ZXIuZGlzcGxheUZpZWxkID0gXCJGT1JfTk9cIjtcbiAgICAgIC8vdGhpcy5mZWF0ZXJMYXllci5sYWJlbHNWaXNpYmxlID0gdHJ1ZTtcbiAgICAgIC8vdGhpcy5mZWF0ZXJMYXllci5sZWdlbmRFbmFibGVkID0gdHJ1ZTtcbiAgICAgIC8vdGhpcy5mZWF0ZXJMYXllci5vdXRGaWVsZHMgPSBbXCJGT1JfTk9cIl07XG4gICAgICAvL3RoaXMuZmVhdGVyTGF5ZXIucG9wdXBFbmFibGVkID0gdHJ1ZTtcbiAgICAgIGNvbnN0IGZlYXRlclJlbmRlcmVyID0gbmV3IFNpbXBsZVJlbmRlcmVyKCk7XG4gICAgICBmZWF0ZXJSZW5kZXJlci5sYWJlbCA9IFwie1NpdGV9XCIgO1xuICAgICAgY29uc3QgcG9seWdvbnNTaW1wbGVGaWxsU3ltYm9sID0gbmV3IFNpbXBsZUZpbGxTeW1ib2woKTtcbiAgICAgIHBvbHlnb25zU2ltcGxlRmlsbFN5bWJvbC5jb2xvciA9IENvbG9yLmZyb21TdHJpbmcoXCJnb2xkXCIpO1xuICAgICAgcG9seWdvbnNTaW1wbGVGaWxsU3ltYm9sLm91dGxpbmUuY29sb3IgPSBDb2xvci5mcm9tU3RyaW5nKFwiYmx1ZVwiKTtcbiAgICAgIHBvbHlnb25zU2ltcGxlRmlsbFN5bWJvbC5vdXRsaW5lLndpZHRoID0gMjtcbiAgICAgIGZlYXRlclJlbmRlcmVyLnN5bWJvbCA9IHBvbHlnb25zU2ltcGxlRmlsbFN5bWJvbDtcbiAgICAgIGNvbnN0IGxhYmVsQ2xhc3MgPSBuZXcgTGFiZWxDbGFzcygpO1xuICAgICAgbGFiZWxDbGFzcy5sYWJlbEV4cHJlc3Npb25JbmZvID0geyBleHByZXNzaW9uOiBcIiRmZWF0dXJlLlNpdGUgKyAnLCAnICsgICRmZWF0dXJlLkhlYk5pYyBcIiB9O1xuICAgICAgdGhpcy5mZWF0ZXJMYXllci5sYWJlbGluZ0luZm8gPSBbbGFiZWxDbGFzc107XG4gICAgICAvL3RoaXMuZmVhdGVyTGF5ZXIucmVuZGVyZXIgPSBmZWF0ZXJSZW5kZXJlcjtcbiAgICAgIHdlYk1hcC5hZGQodGhpcy5mZWF0ZXJMYXllcik7XG5cblxuICAgICAgdGhpcy5tYXBWaWV3LmNvbnRhaW5lciA9IHRoaXMubWFwVmlld0VsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLm1hcFZpZXcubWFwID0gd2ViTWFwO1xuXG5cbiAgICAgIC8vKGF3YWl0IG1hcFZpZXcud2hlbkxheWVyVmlldyhmZWF0ZXJMYXllcikpLmZpbHRlci53aGVyZSA9IFwiR2xvYmFsSUQgPSAnXCIgKyB0aGlzLl9maWx0ZXJbMF0gKyBcIidcIjtcbiAgICAgIC8vbWFwVmlldy53aGVuKCgpID0+IHtcbiAgICAgIC8vICB0aGlzLm1hcExvYWRlZC5lbWl0KHRydWUpO1xuICAgICAgLy99KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICBhbGVydCgnV2UgaGF2ZSBhbiBlcnJvcjogJyArIGVycm9yKTtcbiAgICB9XG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuXG5cbiAgfVxuXG59XG4iXX0=