import { __awaiter } from "tslib";
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
export class WorkUnitComponent {
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
WorkUnitComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: WorkUnitComponent, deps: [{ token: i1.YaaranutService }], target: i0.ɵɵFactoryTarget.Component });
WorkUnitComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.3", type: WorkUnitComponent, selector: "YaaranutGis-workUnit", inputs: { zz: "zz", workUnits: "workUnits" }, outputs: { mapLoaded: "mapLoaded" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["mapViewNode"], descendants: true, static: true }], ngImport: i0, template: `
  <div #mapViewNode style="width:100%;height: 100%;background-color:yellow"></div>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: WorkUnitComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'YaaranutGis-workUnit',
                    template: `
  <div #mapViewNode style="width:100%;height: 100%;background-color:yellow"></div>
  `,
                    styles: []
                }]
        }], ctorParameters: function () { return [{ type: i1.YaaranutService }]; }, propDecorators: { content: [{
                type: ViewChild,
                args: ['mapViewNode', { static: true }]
            }], mapLoaded: [{
                type: Output
            }], zz: [{
                type: Input
            }], workUnits: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yay11bml0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL0xpYnJhcnlzL3NyYy9saWIvd29yay11bml0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEcsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxPQUFPLE1BQU0sNEJBQTRCLENBQUM7QUFDakQsT0FBTyxZQUFZLE1BQU0sa0NBQWtDLENBQUM7QUFDNUQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxVQUFVLE1BQU0sd0NBQXdDLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFnQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RGLE9BQU8sS0FBSyxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZDLE9BQU8sY0FBYyxNQUFNLHVDQUF1QyxDQUFDOzs7QUFXbkUsTUFBTSxPQUFPLGlCQUFpQjtJQVU1QixZQUFvQixFQUFtQjtRQUFuQixPQUFFLEdBQUYsRUFBRSxDQUFpQjtRQUw3QixjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUUxQyxlQUFVLEdBQWEsRUFBRSxDQUFDO1FBQzFCLGNBQVMsR0FBQyxJQUFJLENBQUM7UUFPZixPQUFFLEdBQVMsR0FBRyxDQUFDO1FBdURoQixnQkFBVyxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9DLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBMUQvQixDQUFDO0lBWEQsSUFBZ0QsT0FBTyxDQUFDLE9BQW1CO1FBQ3pFLElBQUksT0FBTyxFQUFFO1lBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7U0FBRTtJQUM1QyxDQUFDO0lBWUQsSUFDSSxFQUFF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QyxTQUFTLENBQUMsYUFBYSxDQUFDO2dCQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0JBRzFCLG1HQUFtRztnQkFDbkcsc0JBQXNCO2dCQUN0Qiw4QkFBOEI7Z0JBQzlCLEtBQUs7YUFDTDtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RCLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUMsQ0FBQzthQUNwQztRQUVILENBQUM7S0FBQTtJQUVELFFBQVE7SUFHUixDQUFDOzs4R0FySVUsaUJBQWlCO2tHQUFqQixpQkFBaUIscVFBTmxCOztHQUVUOzJGQUlVLGlCQUFpQjtrQkFSN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUU7O0dBRVQ7b0JBQ0QsTUFBTSxFQUFFLEVBQ1A7aUJBQ0Y7c0dBR2lELE9BQU87c0JBQXRELFNBQVM7dUJBQUMsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFHaEMsU0FBUztzQkFBbEIsTUFBTTtnQkFZSCxFQUFFO3NCQURMLEtBQUs7Z0JBV0YsU0FBUztzQkFEWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCBXZWJNYXAgZnJvbSBcIkBhcmNnaXMvY29yZS9XZWJNYXBcIjtcbmltcG9ydCBNYXBWaWV3IGZyb20gXCJAYXJjZ2lzL2NvcmUvdmlld3MvTWFwVmlld1wiO1xuaW1wb3J0IEZlYXR1cmVMYXllciBmcm9tIFwiQGFyY2dpcy9jb3JlL2xheWVycy9GZWF0dXJlTGF5ZXJcIjtcbmltcG9ydCBCYXNlbWFwIGZyb20gXCJAYXJjZ2lzL2NvcmUvQmFzZW1hcFwiO1xuaW1wb3J0IExhYmVsQ2xhc3MgZnJvbSBcIkBhcmNnaXMvY29yZS9sYXllcnMvc3VwcG9ydC9MYWJlbENsYXNzXCI7XG5pbXBvcnQgeyBTaW1wbGVGaWxsU3ltYm9sLCBTaW1wbGVMaW5lU3ltYm9sLCBUZXh0U3ltYm9sIH0gZnJvbSAnQGFyY2dpcy9jb3JlL3N5bWJvbHMnO1xuaW1wb3J0IENvbG9yIGZyb20gJ0BhcmNnaXMvY29yZS9Db2xvcic7XG5pbXBvcnQgU2ltcGxlUmVuZGVyZXIgZnJvbSAnQGFyY2dpcy9jb3JlL3JlbmRlcmVycy9TaW1wbGVSZW5kZXJlcic7XG5pbXBvcnQgeyBZYWFyYW51dFNlcnZpY2UgfSBmcm9tICcuLi95YWFyYW51dC5zZXJ2aWNlJztcclxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdZYWFyYW51dEdpcy13b3JrVW5pdCcsXG4gIHRlbXBsYXRlOiBgXG4gIDxkaXYgI21hcFZpZXdOb2RlIHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6IDEwMCU7YmFja2dyb3VuZC1jb2xvcjp5ZWxsb3dcIj48L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgV29ya1VuaXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBWaWV3Q2hpbGQoJ21hcFZpZXdOb2RlJywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnQoY29udGVudDogRWxlbWVudFJlZikge1xuICAgIGlmIChjb250ZW50KSB7IHRoaXMubWFwVmlld0VsID0gY29udGVudDsgfVxuICB9XG4gIEBPdXRwdXQoKSBtYXBMb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIHByaXZhdGUgbWFwVmlld0VsITogRWxlbWVudFJlZjtcbiAgcHJpdmF0ZSBfd29ya1VuaXRzOiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIGZpcnN0VGltZT10cnVlOyBcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHlzOiBZYWFyYW51dFNlcnZpY2UpIHtcblxuXG4gIH1cblxuICBwcml2YXRlIF96OiBzdHJpbmc9XCJ6XCI7XG4gIEBJbnB1dCgpXG4gIHNldCB6eih6eno6IHN0cmluZylcbiAge1xuICAgIHRoaXMuX3o9enp6O1xuICB9XG4gIGdldCB6eigpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5fejtcbiAgfVxuICBcbiAgQElucHV0KClcbiAgc2V0IHdvcmtVbml0cyh3b3JrVW5pdHM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fd29ya1VuaXRzID0gd29ya1VuaXRzO1xuXG4gICAgaWYgKHRoaXMuZmlyc3RUaW1lKSBcbiAgICB7XG4gICAgICB0aGlzLmZpcnN0VGltZT1mYWxzZTtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZU1hcCgpO1xuICAgIH1cbiAgICBjb25zdCBXb3JrVW5pdHNXaGVyZSA9IHdvcmtVbml0cy5tYXAoXG4gICAgICB3b3JrVW5pdCA9PiBcbiAgICAgIFwiJ1wiICsgd29ya1VuaXQgKyBcIidcIlxuICAgICAgKS5cbiAgICAgIGpvaW4oKTsgICAgXG4gICAgdGhpcy5mZWF0ZXJMYXllci5kZWZpbml0aW9uRXhwcmVzc2lvbiA9IFwiR2xvYmFsSUQgaW4gKFwiICsgV29ya1VuaXRzV2hlcmUgKyBcIilcIjtcbiAgICBcbiAgICB0aGlzLmZlYXRlckxheWVyLndoZW4oXG4gICAgICgpID0+IHtcbiAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMuZmVhdGVyTGF5ZXIuY3JlYXRlUXVlcnkoKTtcbiAgICAgICBxdWVyeS5vdXRTcGF0aWFsUmVmZXJlbmNlID0gdGhpcy5tYXBWaWV3LnNwYXRpYWxSZWZlcmVuY2U7XG4gICAgICAgdGhpcy5mZWF0ZXJMYXllci5xdWVyeUZlYXR1cmVzKCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICByZXNwb25zZS5mZWF0dXJlcy5mb3JFYWNoKGZlYXR1cmUgPT4ge1xuICAgICAgICAgICBjb25zdCBheHp6ID0gXCJEZmdkXCI7XG4gICAgICAgICB9KTtcbiAgICAgICB9KTtcbiAgICAgICB0aGlzLmZlYXRlckxheWVyLnF1ZXJ5RXh0ZW50KHF1ZXJ5KVxuICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICBpZiAocmVzcG9uc2UuZXh0ZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXNwb25zZS5leHRlbnQuc3BhdGlhbFJlZmVyZW5jZT0gdGhpcy5tYXBWaWV3LnNwYXRpYWxSZWZlcmVuY2U7XG4gICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmdvVG8ocmVzcG9uc2UuZXh0ZW50KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHsgY29uc29sZS5lcnJvcihlcnJvcik7IH0pO1xuICAgICAgICAgICB9XG4gICAgICAgICAgIGNvbnN0IEVzcmlQd29lckJ5ZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZXNyaS11aSBjYWxjaXRlLXRoZW1lLWxpZ2h0XCIpO1xuICAgICAgICAgICAvL0VzcmlQd29lckJ5ZWxlbWVudHNbMF0uc2V0QXR0cmlidXRlKFwic3R5bGVcIixcImRpc3BsYXk6bm9uZVwiKTsgICAgICAgICAgIFxuICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEVzcmlQd29lckJ5ZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICBFc3JpUHdvZXJCeWVsZW1lbnRzW2ldLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheTpub25lXCIpO1xuICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgfSk7XG4gIH1cbiAgZ2V0IHdvcmtVbml0cygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3dvcmtVbml0cztcbiAgfVxuXG4gIHB1YmxpYyBmZWF0ZXJMYXllcjogRmVhdHVyZUxheWVyID0gbmV3IEZlYXR1cmVMYXllcigpO1xuICBwdWJsaWMgbWFwVmlldyA9IG5ldyBNYXBWaWV3KCk7XG4gIFxuICAgXG4gIGFzeW5jIGluaXRpYWxpemVNYXAoKSB7XG4gICAgY29uc3Qgd2ViTWFwID0gbmV3IFdlYk1hcCh7XG4gICAgIGJhc2VtYXA6IFwidG9wb1wiLFxuICAgICAvL3BvcnRhbEl0ZW06IHtcbiAgICAgLy8gIC8vdXJsOlwiaHR0cHM6Ly9zZXJ2aWNlczIuYXJjZ2lzLmNvbS91dE5Ocm1YYjRJWk9MWFhzL0FyY0dJUy9yZXN0L3NlcnZpY2VzL0pORklMRm9yZXN0L0ZlYXR1cmVTZXJ2ZXIvMC9xdWVyeVwiXG4gICAgIC8vICBpZDogXCJzdHJlZXRzXCJcbiAgICAgLy99XG4gICAgfSk7XG4gICAgbGV0IGJhc2VtYXAgPSBuZXcgQmFzZW1hcCh7XG4gICAgIHBvcnRhbEl0ZW06IHtcbiAgICAgICAvL3VybDpcIlwiXG4gICAgICAgaWQ6IFwic3RyZWV0c1wiICAvLyBXR1M4NCBTdHJlZXRzIFZlY3RvciB3ZWJtYXBcbiAgICAgfVxuICAgIH0pO1xuXG4gICAgdHJ5IHtcbiAgICAgLy8gdGhpcy5mZWF0ZXJMYXllciA9IG5ldyBGZWF0dXJlTGF5ZXIoeyB1cmw6IFwiaHR0cDovL2xvY2FsaG9zdDoyNzU1Mi91dE5Ocm1YYjRJWk9MWFhzL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1Rlc3RfS0tMRm9yZXN0TWFuYWdlbWVudFVuaXRzL0ZlYXR1cmVTZXJ2ZXIvMC9xdWVyeVwiIH0pO1xuICAgICAgdGhpcy5mZWF0ZXJMYXllciA9IG5ldyBGZWF0dXJlTGF5ZXIoe1xuICAgICAgICB1cmw6IHRoaXMueXMuYXBpVXJsICsgXCIvQXJjR0lTL3Jlc3Qvc2VydmljZXMvS0tMRm9yZXN0TWFuYWdlbWVudFVuaXRzL0ZlYXR1cmVTZXJ2ZXIvMFwiXG4gICAgICB9KTtcbiAgICAgdGhpcy5mZWF0ZXJMYXllci5vcGFjaXR5ID0gMC41O1xuICAgICB0aGlzLmZlYXRlckxheWVyLmRlZmluaXRpb25FeHByZXNzaW9uID0gXCIxPTJcIjtcbiAgICAgLy90aGlzLmZlYXRlckxheWVyLmRpc3BsYXlGaWVsZCA9IFwiRk9SX05PXCI7XG4gICAgIC8vdGhpcy5mZWF0ZXJMYXllci5sYWJlbHNWaXNpYmxlID0gdHJ1ZTtcbiAgICAgLy90aGlzLmZlYXRlckxheWVyLmxlZ2VuZEVuYWJsZWQgPSB0cnVlO1xuICAgICAvL3RoaXMuZmVhdGVyTGF5ZXIub3V0RmllbGRzID0gW1wiRk9SX05PXCJdO1xuICAgICAvL3RoaXMuZmVhdGVyTGF5ZXIucG9wdXBFbmFibGVkID0gdHJ1ZTtcbiAgICAgY29uc3QgZmVhdGVyUmVuZGVyZXIgPSBuZXcgU2ltcGxlUmVuZGVyZXIoKTtcbiAgICAgZmVhdGVyUmVuZGVyZXIubGFiZWwgPSBcIntGT1JfTk99XCI7XG4gICAgIGNvbnN0IHBvbHlnb25zU2ltcGxlRmlsbFN5bWJvbCA9IG5ldyBTaW1wbGVGaWxsU3ltYm9sKCk7XG4gICAgIHBvbHlnb25zU2ltcGxlRmlsbFN5bWJvbC5jb2xvciA9IENvbG9yLmZyb21TdHJpbmcoXCJnb2xkXCIpO1xuICAgICBwb2x5Z29uc1NpbXBsZUZpbGxTeW1ib2wub3V0bGluZS5jb2xvciA9IENvbG9yLmZyb21TdHJpbmcoXCJibHVlXCIpO1xuICAgICBwb2x5Z29uc1NpbXBsZUZpbGxTeW1ib2wub3V0bGluZS53aWR0aCA9IDI7XG4gICAgIGZlYXRlclJlbmRlcmVyLnN5bWJvbCA9IHBvbHlnb25zU2ltcGxlRmlsbFN5bWJvbDtcbiAgICAgY29uc3QgbGFiZWxDbGFzcyA9IG5ldyBMYWJlbENsYXNzKCk7XG4gICAgIGxhYmVsQ2xhc3MubGFiZWxFeHByZXNzaW9uSW5mbyA9IHsgZXhwcmVzc2lvbjogXCIkZmVhdHVyZS5GT1JfTk8gIFwiIH07XG4gICAgIHRoaXMuZmVhdGVyTGF5ZXIubGFiZWxpbmdJbmZvID0gW2xhYmVsQ2xhc3NdO1xuICAgICB0aGlzLmZlYXRlckxheWVyLnJlbmRlcmVyID0gZmVhdGVyUmVuZGVyZXI7XG4gICAgIHdlYk1hcC5hZGQodGhpcy5mZWF0ZXJMYXllcik7XG5cblxuICAgICB0aGlzLm1hcFZpZXcuY29udGFpbmVyID0gdGhpcy5tYXBWaWV3RWwubmF0aXZlRWxlbWVudDtcbiAgICAgdGhpcy5tYXBWaWV3Lm1hcCA9IHdlYk1hcDtcblxuXG4gICAgIC8vKGF3YWl0IG1hcFZpZXcud2hlbkxheWVyVmlldyhmZWF0ZXJMYXllcikpLmZpbHRlci53aGVyZSA9IFwiR2xvYmFsSUQgPSAnXCIgKyB0aGlzLl9maWx0ZXJbMF0gKyBcIidcIjtcbiAgICAgLy9tYXBWaWV3LndoZW4oKCkgPT4ge1xuICAgICAvLyAgdGhpcy5tYXBMb2FkZWQuZW1pdCh0cnVlKTtcbiAgICAgLy99KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgIGFsZXJ0KCdXZSBoYXZlIGFuIGVycm9yOiAnICsgZXJyb3IpO1xuICAgIH1cblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgIFxuICAgIFxuICB9XG5cbn1cbiJdfQ==