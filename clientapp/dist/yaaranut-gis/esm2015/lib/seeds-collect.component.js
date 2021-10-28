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
                    url: this.ys.apiUrl + "/ArcGIS/rest/services/SeedCollect2021/FeatureServer/0"
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
SeedsCollectComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: SeedsCollectComponent, deps: [{ token: i1.YaaranutService }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: function () { return [{ type: i1.YaaranutService }]; }, propDecorators: { content: [{
                type: ViewChild,
                args: ['mapViewSeedsCollect', { static: true }]
            }], mapLoaded: [{
                type: Output
            }], seedsCollects: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZHMtY29sbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9MaWJyYXJ5cy9zcmMvbGliL3NlZWRzLWNvbGxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV0RyxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLE9BQU8sTUFBTSw0QkFBNEIsQ0FBQztBQUVqRCxPQUFPLFlBQVksTUFBTSxrQ0FBa0MsQ0FBQztBQUM1RCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLFVBQVUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQWdDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEYsT0FBTyxLQUFLLE1BQU0sb0JBQW9CLENBQUM7QUFDdkMsT0FBTyxjQUFjLE1BQU0sdUNBQXVDLENBQUM7OztBQVduRSxNQUFNLE9BQU8scUJBQXFCO0lBeURoQyxZQUFvQixFQUFtQjtRQUFuQixPQUFFLEdBQUYsRUFBRSxDQUFpQjtRQXREL0IsbUJBQWMsR0FBYSxFQUFFLENBQUM7UUFDOUIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUtmLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBOEMzQyxnQkFBVyxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9DLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBSS9CLENBQUM7SUF0REQsSUFBd0QsT0FBTyxDQUFDLE9BQW1CO1FBQ2pGLElBQUksT0FBTyxFQUFFO1lBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7U0FBRTtJQUM1QyxDQUFDO0lBSUQsSUFDSSxhQUFhLENBQUMsYUFBdUI7UUFF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S0FBSyxDQUFDLENBQUM7Z0JBQ3JCLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUMsQ0FBQzthQUNyQztRQUVILENBQUM7S0FBQTtJQUVELFFBQVE7SUFHUixDQUFDOztrSEExSFUscUJBQXFCO3NHQUFyQixxQkFBcUIsK1FBTnRCOztHQUVUOzJGQUlVLHFCQUFxQjtrQkFSakMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxRQUFRLEVBQUU7O0dBRVQ7b0JBQ0QsTUFBTSxFQUFFLEVBQ1A7aUJBQ0Y7c0dBT3lELE9BQU87c0JBQTlELFNBQVM7dUJBQUMscUJBQXFCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUd4QyxTQUFTO3NCQUFsQixNQUFNO2dCQUlILGFBQWE7c0JBRGhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IFdlYk1hcCBmcm9tIFwiQGFyY2dpcy9jb3JlL1dlYk1hcFwiO1xuaW1wb3J0IE1hcFZpZXcgZnJvbSBcIkBhcmNnaXMvY29yZS92aWV3cy9NYXBWaWV3XCI7XG5pbXBvcnQgZXNyaUNvbmZpZyBmcm9tIFwiQGFyY2dpcy9jb3JlL2NvbmZpZ1wiO1xuaW1wb3J0IEZlYXR1cmVMYXllciBmcm9tIFwiQGFyY2dpcy9jb3JlL2xheWVycy9GZWF0dXJlTGF5ZXJcIjtcbmltcG9ydCBCYXNlbWFwIGZyb20gXCJAYXJjZ2lzL2NvcmUvQmFzZW1hcFwiO1xuaW1wb3J0IExhYmVsQ2xhc3MgZnJvbSBcIkBhcmNnaXMvY29yZS9sYXllcnMvc3VwcG9ydC9MYWJlbENsYXNzXCI7XG5pbXBvcnQgeyBTaW1wbGVGaWxsU3ltYm9sLCBTaW1wbGVMaW5lU3ltYm9sLCBUZXh0U3ltYm9sIH0gZnJvbSAnQGFyY2dpcy9jb3JlL3N5bWJvbHMnO1xuaW1wb3J0IENvbG9yIGZyb20gJ0BhcmNnaXMvY29yZS9Db2xvcic7XG5pbXBvcnQgU2ltcGxlUmVuZGVyZXIgZnJvbSAnQGFyY2dpcy9jb3JlL3JlbmRlcmVycy9TaW1wbGVSZW5kZXJlcic7XG5pbXBvcnQgeyBZYWFyYW51dFNlcnZpY2UgfSBmcm9tICcuLi95YWFyYW51dC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1lhYXJhbnV0R2lzLVNlZWRzQ29sbGVjdCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAjbWFwVmlld1NlZWRzQ29sbGVjdCBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OiAxMDAlO2JhY2tncm91bmQtY29sb3I6Z3JlZW5cIj48L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gIF0gICBcbn0pXG5leHBvcnQgY2xhc3MgU2VlZHNDb2xsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwcml2YXRlIG1hcFZpZXdFbCE6IEVsZW1lbnRSZWY7XG4gIHByaXZhdGUgX1NlZWRzQ29sbGVjdHM6IHN0cmluZ1tdID0gW107XG4gIHByaXZhdGUgZmlyc3RUaW1lID0gdHJ1ZTtcblxuICBAVmlld0NoaWxkKCdtYXBWaWV3U2VlZHNDb2xsZWN0JywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnQoY29udGVudDogRWxlbWVudFJlZikge1xuICAgIGlmIChjb250ZW50KSB7IHRoaXMubWFwVmlld0VsID0gY29udGVudDsgfVxuICB9XG4gIEBPdXRwdXQoKSBtYXBMb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIFxuICAgIFxuICBASW5wdXQoKVxuICBzZXQgc2VlZHNDb2xsZWN0cyhTZWVkc0NvbGxlY3RzOiBzdHJpbmdbXSkge1xuICAgICBcbiAgICB0aGlzLl9TZWVkc0NvbGxlY3RzID0gU2VlZHNDb2xsZWN0cztcbiAgIFxuICAgIGlmICh0aGlzLmZpcnN0VGltZSkge1xuICAgICAgdGhpcy5maXJzdFRpbWUgPSBmYWxzZTtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZU1hcCgpO1xuICAgIH1cbiAgICBsZXQgU2VlZHNDb2xsZWN0c1doZXJlID1cIlwiXG4gICAgdGhpcy5fU2VlZHNDb2xsZWN0cy5mb3JFYWNoKFxuICAgICAgU2VlZHNDb2xsZWN0ID0+XG4gICAgICAgIFNlZWRzQ29sbGVjdHNXaGVyZSArPSBcIkdsb2JhbElEXzIgPSdcIiArIFNlZWRzQ29sbGVjdCArIFwiJyBvciBcIlxuICAgICk7XG4gICAgU2VlZHNDb2xsZWN0c1doZXJlICs9IFwiMT0yXCJcbiAgICB0aGlzLmZlYXRlckxheWVyLmRlZmluaXRpb25FeHByZXNzaW9uID0gIFNlZWRzQ29sbGVjdHNXaGVyZSAgOyAgICAgXG4gICAgdGhpcy5mZWF0ZXJMYXllci53aGVuKFxuICAgICAgKCkgPT4ge1xuICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMuZmVhdGVyTGF5ZXIuY3JlYXRlUXVlcnkoKTtcbiAgICAgICAgcXVlcnkub3V0U3BhdGlhbFJlZmVyZW5jZSA9IHRoaXMubWFwVmlldy5zcGF0aWFsUmVmZXJlbmNlO1xuICAgICAgICB0aGlzLmZlYXRlckxheWVyLnF1ZXJ5RmVhdHVyZXMoKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICByZXNwb25zZS5mZWF0dXJlcy5mb3JFYWNoKGZlYXR1cmUgPT4ge1xuICAgICAgICAgICAgY29uc3QgYXh6eiA9IFwiRGZnZFwiO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5mZWF0ZXJMYXllci5xdWVyeUV4dGVudChxdWVyeSlcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZXh0ZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJlc3BvbnNlLmV4dGVudC5zcGF0aWFsUmVmZXJlbmNlID0gdGhpcy5tYXBWaWV3LnNwYXRpYWxSZWZlcmVuY2U7XG4gICAgICAgICAgICAgIHRoaXMubWFwVmlldy5nb1RvKHJlc3BvbnNlLmV4dGVudCkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7IGNvbnNvbGUuZXJyb3IoZXJyb3IpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBFc3JpUHdvZXJCeWVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImVzcmktdWkgY2FsY2l0ZS10aGVtZS1saWdodFwiKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRXNyaVB3b2VyQnllbGVtZW50cy5sZW5ndGg7IGkrKykgeyAgXG4gICAgICAgICAgICAgIEVzcmlQd29lckJ5ZWxlbWVudHNbaV0uc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5Om5vbmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuICB9XG4gIGdldCBzZWVkc0NvbGxlY3RzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fU2VlZHNDb2xsZWN0cztcbiAgfVxuXG4gIHB1YmxpYyBmZWF0ZXJMYXllcjogRmVhdHVyZUxheWVyID0gbmV3IEZlYXR1cmVMYXllcigpO1xuICBwdWJsaWMgbWFwVmlldyA9IG5ldyBNYXBWaWV3KCk7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgeXM6IFlhYXJhbnV0U2VydmljZSkge1xuXG5cbiAgfVxuXG4gIGFzeW5jIGluaXRpYWxpemVNYXAoKSB7XG4gICAgY29uc3Qgd2ViTWFwID0gbmV3IFdlYk1hcCh7XG4gICAgICBiYXNlbWFwOiBcInRvcG9cIixcbiAgICAgIC8vcG9ydGFsSXRlbToge1xuICAgICAgLy8gIC8vdXJsOlwiaHR0cHM6Ly9zZXJ2aWNlczIuYXJjZ2lzLmNvbS91dE5Ocm1YYjRJWk9MWFhzL0FyY0dJUy9yZXN0L3NlcnZpY2VzL0pORklMRm9yZXN0L0ZlYXR1cmVTZXJ2ZXIvMC9xdWVyeVwiXG4gICAgICAvLyAgaWQ6IFwic3RyZWV0c1wiXG4gICAgICAvL31cbiAgICB9KTtcbiAgICBsZXQgYmFzZW1hcCA9IG5ldyBCYXNlbWFwKHtcbiAgICAgIHBvcnRhbEl0ZW06IHtcbiAgICAgICAgLy91cmw6XCJcIlxuICAgICAgICAvL2lkOiBcInN0cmVldHNcIiAgLy8gV0dTODQgU3RyZWV0cyBWZWN0b3Igd2VibWFwXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0cnkge1xuICAgICAgLy9lc3JpQ29uZmlnLmFwaUtleSA9IFwiQUFQSzlhM2Y1NWMzODBmOTRkMWJiMTBhNzU2NmM3YjMyZjk0MVhfcGNaS1htV1k3R3JqczZvQTlBcXVmc0RIcnZSRFlhT2xVRzhndnlENWZoWnYtT0dZeUlnWEVPLWlodU80VFwiO1xuXG4gICAgICB0aGlzLmZlYXRlckxheWVyID0gbmV3IEZlYXR1cmVMYXllcih7XHJcbiAgICAgICAgdXJsOiB0aGlzLnlzLmFwaVVybCArIFwiL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1NlZWRDb2xsZWN0MjAyMS9GZWF0dXJlU2VydmVyLzBcIlxyXG4gICAgICB9KTsgXG4gICAgICB0aGlzLmZlYXRlckxheWVyLm9wYWNpdHkgPSAwLjU7XG4gICAgICB0aGlzLmZlYXRlckxheWVyLmRlZmluaXRpb25FeHByZXNzaW9uID0gXCIxPTJcIjtcbiAgICAgIC8vdGhpcy5mZWF0ZXJMYXllci5kaXNwbGF5RmllbGQgPSBcIkZPUl9OT1wiO1xuICAgICAgLy90aGlzLmZlYXRlckxheWVyLmxhYmVsc1Zpc2libGUgPSB0cnVlO1xuICAgICAgLy90aGlzLmZlYXRlckxheWVyLmxlZ2VuZEVuYWJsZWQgPSB0cnVlO1xuICAgICAgLy90aGlzLmZlYXRlckxheWVyLm91dEZpZWxkcyA9IFtcIkZPUl9OT1wiXTtcbiAgICAgIC8vdGhpcy5mZWF0ZXJMYXllci5wb3B1cEVuYWJsZWQgPSB0cnVlO1xuICAgICAgY29uc3QgZmVhdGVyUmVuZGVyZXIgPSBuZXcgU2ltcGxlUmVuZGVyZXIoKTtcbiAgICAgIGZlYXRlclJlbmRlcmVyLmxhYmVsID0gXCJ7U2l0ZX1cIiA7XG4gICAgICBjb25zdCBwb2x5Z29uc1NpbXBsZUZpbGxTeW1ib2wgPSBuZXcgU2ltcGxlRmlsbFN5bWJvbCgpO1xuICAgICAgcG9seWdvbnNTaW1wbGVGaWxsU3ltYm9sLmNvbG9yID0gQ29sb3IuZnJvbVN0cmluZyhcImdvbGRcIik7XG4gICAgICBwb2x5Z29uc1NpbXBsZUZpbGxTeW1ib2wub3V0bGluZS5jb2xvciA9IENvbG9yLmZyb21TdHJpbmcoXCJibHVlXCIpO1xuICAgICAgcG9seWdvbnNTaW1wbGVGaWxsU3ltYm9sLm91dGxpbmUud2lkdGggPSAyO1xuICAgICAgZmVhdGVyUmVuZGVyZXIuc3ltYm9sID0gcG9seWdvbnNTaW1wbGVGaWxsU3ltYm9sO1xuICAgICAgY29uc3QgbGFiZWxDbGFzcyA9IG5ldyBMYWJlbENsYXNzKCk7XG4gICAgICBsYWJlbENsYXNzLmxhYmVsRXhwcmVzc2lvbkluZm8gPSB7IGV4cHJlc3Npb246IFwiJGZlYXR1cmUuU2l0ZSArICcsICcgKyAgJGZlYXR1cmUuSGViTmljIFwiIH07XG4gICAgICB0aGlzLmZlYXRlckxheWVyLmxhYmVsaW5nSW5mbyA9IFtsYWJlbENsYXNzXTtcbiAgICAgIC8vdGhpcy5mZWF0ZXJMYXllci5yZW5kZXJlciA9IGZlYXRlclJlbmRlcmVyO1xuICAgICAgd2ViTWFwLmFkZCh0aGlzLmZlYXRlckxheWVyKTtcblxuXG4gICAgICB0aGlzLm1hcFZpZXcuY29udGFpbmVyID0gdGhpcy5tYXBWaWV3RWwubmF0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMubWFwVmlldy5tYXAgPSB3ZWJNYXA7XG5cblxuICAgICAgLy8oYXdhaXQgbWFwVmlldy53aGVuTGF5ZXJWaWV3KGZlYXRlckxheWVyKSkuZmlsdGVyLndoZXJlID0gXCJHbG9iYWxJRCA9ICdcIiArIHRoaXMuX2ZpbHRlclswXSArIFwiJ1wiO1xuICAgICAgLy9tYXBWaWV3LndoZW4oKCkgPT4ge1xuICAgICAgLy8gIHRoaXMubWFwTG9hZGVkLmVtaXQodHJ1ZSk7XG4gICAgICAvL30pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIGFsZXJ0KCdXZSBoYXZlIGFuIGVycm9yOiAnICsgZXJyb3IpO1xuICAgIH1cblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG5cblxuICB9XG5cbn1cbiJdfQ==