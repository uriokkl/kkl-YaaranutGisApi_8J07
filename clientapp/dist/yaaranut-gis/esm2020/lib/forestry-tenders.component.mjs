import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import { SimpleFillSymbol } from '@arcgis/core/symbols';
import Color from '@arcgis/core/Color';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import * as i0 from "@angular/core";
import * as i1 from "../yaaranut.service";
export class ForestryTendersComponent {
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
    async initializeMap() {
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
    }
    ngOnInit() { }
}
ForestryTendersComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ForestryTendersComponent, deps: [{ token: i1.YaaranutService }], target: i0.ɵɵFactoryTarget.Component });
ForestryTendersComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: ForestryTendersComponent, selector: "YaaranutGis-ForestryTenders", inputs: { ForestryTenders: "ForestryTenders" }, outputs: { mapLoaded: "mapLoaded" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["mapViewForestryTenders"], descendants: true, static: true }], ngImport: i0, template: `
    <div #mapViewForestryTenders style="width:100%;height: 100%;background-color:green"></div>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ForestryTendersComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'YaaranutGis-ForestryTenders',
                    template: `
    <div #mapViewForestryTenders style="width:100%;height: 100%;background-color:green"></div>
  `,
                    styles: []
                }]
        }], ctorParameters: function () { return [{ type: i1.YaaranutService }]; }, propDecorators: { content: [{
                type: ViewChild,
                args: ['mapViewForestryTenders', { static: true }]
            }], mapLoaded: [{
                type: Output
            }], ForestryTenders: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZXN0cnktdGVuZGVycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9MaWJyYXJ5cy9zcmMvbGliL2ZvcmVzdHJ5LXRlbmRlcnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRHLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sT0FBTyxNQUFNLDRCQUE0QixDQUFDO0FBRWpELE9BQU8sWUFBWSxNQUFNLGtDQUFrQyxDQUFDO0FBRTVELE9BQU8sVUFBVSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBZ0MsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RixPQUFPLEtBQUssTUFBTSxvQkFBb0IsQ0FBQztBQUN2QyxPQUFPLGNBQWMsTUFBTSx1Q0FBdUMsQ0FBQzs7O0FBV25FLE1BQU0sT0FBTyx3QkFBd0I7SUFtRGpDLFlBQW9CLEVBQW1CO1FBQW5CLE9BQUUsR0FBRixFQUFFLENBQWlCO1FBakRoQyxnQkFBVyxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9DLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRXZCLHFCQUFnQixHQUFhLEVBQUUsQ0FBQztRQUNoQyxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBR2YsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUEwQ1AsQ0FBQztJQTNDNUMsSUFBMkQsT0FBTyxDQUFDLE9BQW1CLElBQUksSUFBSSxPQUFPLEVBQUU7UUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztLQUFFLENBQUUsQ0FBQztJQUd2SSxJQUNJLGVBQWUsQ0FBQyxlQUF5QjtRQUV6QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFB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TSxDQUFDLENBQUM7WUFDbEUsd0JBQXdCLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDM0MsTUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUM1QyxjQUFjLENBQUMsTUFBTSxHQUFHLHdCQUF3QixDQUFDO1lBQ2pELGNBQWMsQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDO1lBRXRDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRTdCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQ3RELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztTQUM3QjtRQUNELE9BQU8sS0FBSyxFQUFFO1lBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixLQUFLLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDdkM7SUFFTCxDQUFDO0lBRUQsUUFBUSxLQUFNLENBQUM7O3FIQXhGTix3QkFBd0I7eUdBQXhCLHdCQUF3Qix5UkFOekI7O0dBRVQ7MkZBSVUsd0JBQXdCO2tCQVJwQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3pDLFFBQVEsRUFBRTs7R0FFVDtvQkFDRCxNQUFNLEVBQUUsRUFDUDtpQkFDRjtzR0FTOEQsT0FBTztzQkFBakUsU0FBUzt1QkFBQyx3QkFBd0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBQzNDLFNBQVM7c0JBQWxCLE1BQU07Z0JBR0gsZUFBZTtzQkFEbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IFdlYk1hcCBmcm9tIFwiQGFyY2dpcy9jb3JlL1dlYk1hcFwiO1xyXG5pbXBvcnQgTWFwVmlldyBmcm9tIFwiQGFyY2dpcy9jb3JlL3ZpZXdzL01hcFZpZXdcIjtcclxuaW1wb3J0IGVzcmlDb25maWcgZnJvbSBcIkBhcmNnaXMvY29yZS9jb25maWdcIjtcclxuaW1wb3J0IEZlYXR1cmVMYXllciBmcm9tIFwiQGFyY2dpcy9jb3JlL2xheWVycy9GZWF0dXJlTGF5ZXJcIjtcclxuaW1wb3J0IEJhc2VtYXAgZnJvbSBcIkBhcmNnaXMvY29yZS9CYXNlbWFwXCI7XHJcbmltcG9ydCBMYWJlbENsYXNzIGZyb20gXCJAYXJjZ2lzL2NvcmUvbGF5ZXJzL3N1cHBvcnQvTGFiZWxDbGFzc1wiO1xyXG5pbXBvcnQgeyBTaW1wbGVGaWxsU3ltYm9sLCBTaW1wbGVMaW5lU3ltYm9sLCBUZXh0U3ltYm9sIH0gZnJvbSAnQGFyY2dpcy9jb3JlL3N5bWJvbHMnO1xyXG5pbXBvcnQgQ29sb3IgZnJvbSAnQGFyY2dpcy9jb3JlL0NvbG9yJztcclxuaW1wb3J0IFNpbXBsZVJlbmRlcmVyIGZyb20gJ0BhcmNnaXMvY29yZS9yZW5kZXJlcnMvU2ltcGxlUmVuZGVyZXInO1xyXG5pbXBvcnQgeyBZYWFyYW51dFNlcnZpY2UgfSBmcm9tICcuLi95YWFyYW51dC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdZYWFyYW51dEdpcy1Gb3Jlc3RyeVRlbmRlcnMnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2ICNtYXBWaWV3Rm9yZXN0cnlUZW5kZXJzIHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6IDEwMCU7YmFja2dyb3VuZC1jb2xvcjpncmVlblwiPjwvZGl2PlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9yZXN0cnlUZW5kZXJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBwdWJsaWMgZmVhdGVyTGF5ZXI6IEZlYXR1cmVMYXllciA9IG5ldyBGZWF0dXJlTGF5ZXIoKTtcclxuICAgIHB1YmxpYyBtYXBWaWV3ID0gbmV3IE1hcFZpZXcoKTtcclxuICAgIHByaXZhdGUgbWFwVmlld0VsITogRWxlbWVudFJlZjtcclxuICAgIHByaXZhdGUgX0ZvcmVzdHJ5VGVuZGVyczogc3RyaW5nW10gPSBbXTtcclxuICAgIHByaXZhdGUgZmlyc3RUaW1lID0gdHJ1ZTtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdtYXBWaWV3Rm9yZXN0cnlUZW5kZXJzJywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnQoY29udGVudDogRWxlbWVudFJlZikgeyBpZiAoY29udGVudCkgeyB0aGlzLm1hcFZpZXdFbCA9IGNvbnRlbnQ7IH0gIH1cclxuICAgIEBPdXRwdXQoKSBtYXBMb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBGb3Jlc3RyeVRlbmRlcnMoRm9yZXN0cnlUZW5kZXJzOiBzdHJpbmdbXSkge1xyXG5cclxuICAgICAgICB0aGlzLl9Gb3Jlc3RyeVRlbmRlcnMgPSBGb3Jlc3RyeVRlbmRlcnM7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmZpcnN0VGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0VGltZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVNYXAoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbGV0IEZvcmVzdHJ5VGVuZGVyc1doZXJlID0gXCJcIiAgICAgICAgXHJcbiAgICAgICAgLy90aGlzLl9Gb3Jlc3RyeVRlbmRlcnMuZm9yRWFjaChcclxuICAgICAgICAvLyAgICBGb3Jlc3RyeVRlbmRlcnMgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICBpZiAoRm9yZXN0cnlUZW5kZXJzV2hlcmUgIT09IFwiXCIpIEZvcmVzdHJ5VGVuZGVyc1doZXJlICs9IFwiIG9yIFwiO1xyXG4gICAgICAgIC8vICAgICAgICBGb3Jlc3RyeVRlbmRlcnNXaGVyZSArPSBcIkdsb2JhbElEID0nXCIgKyBGb3Jlc3RyeVRlbmRlcnMgKyBcIidcIlxyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvLyk7XHJcbiAgICAgICAgY29uc3QgRm9yZXN0cnlUZW5kZXJzV2hlcmUgPSBcIkdsb2JhbElEPSdcIiArIHRoaXMuX0ZvcmVzdHJ5VGVuZGVycy5qb2luKFwiJyBvciBHbG9iYWxJRD0nXCIpICsgXCInXCJcclxuICAgICAgICB0aGlzLmZlYXRlckxheWVyLmRlZmluaXRpb25FeHByZXNzaW9uID0gRm9yZXN0cnlUZW5kZXJzV2hlcmU7XHJcbiAgICAgICAgdGhpcy5mZWF0ZXJMYXllci53aGVuKFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMuZmVhdGVyTGF5ZXIuY3JlYXRlUXVlcnkoKTtcclxuICAgICAgICAgICAgICAgIHF1ZXJ5Lm91dFNwYXRpYWxSZWZlcmVuY2UgPSB0aGlzLm1hcFZpZXcuc3BhdGlhbFJlZmVyZW5jZTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZlYXRlckxheWVyLnF1ZXJ5RXh0ZW50KHF1ZXJ5KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmV4dGVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZXh0ZW50LnNwYXRpYWxSZWZlcmVuY2UgPSB0aGlzLm1hcFZpZXcuc3BhdGlhbFJlZmVyZW5jZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwVmlldy5nb1RvKHJlc3BvbnNlLmV4dGVudCkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7IGNvbnNvbGUuZXJyb3IoZXJyb3IpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgRXNyaVB3b2VyQnllbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlc3JpLXVpIGNhbGNpdGUtdGhlbWUtbGlnaHRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRXNyaVB3b2VyQnllbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRXNyaVB3b2VyQnllbGVtZW50c1tpXS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImRpc3BsYXk6bm9uZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldCBGb3Jlc3RyeVRlbmRlcnMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9Gb3Jlc3RyeVRlbmRlcnM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgeXM6IFlhYXJhbnV0U2VydmljZSkgeyB9XHJcbiAgICBhc3luYyBpbml0aWFsaXplTWFwKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdlYk1hcCA9IG5ldyBXZWJNYXAoe1xyXG4gICAgICAgICAgICAgICAgYmFzZW1hcDogXCJ0b3BvXCIsICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBsYWJlbENsYXNzID0gbmV3IExhYmVsQ2xhc3MoKTtcclxuICAgICAgICAgICAgbGFiZWxDbGFzcy5sYWJlbEV4cHJlc3Npb25JbmZvID0geyBleHByZXNzaW9uOiBcIiRmZWF0dXJlLlRlbmRlck5hbWUgKyAnLCAnICsgICRmZWF0dXJlLlN1YlRlbmRlcklEICsgJywgJyArICAkZmVhdHVyZS5TdWJUZW5kZXJZZWFyIFwiIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZlYXRlckxheWVyID0gbmV3IEZlYXR1cmVMYXllcih7XHJcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMueXMuYXBpVXJsICsgXCIvQXJjR0lTL3Jlc3Qvc2VydmljZXMvRm9yZXN0cnlUZW5kZXJzL0ZlYXR1cmVTZXJ2ZXIvMS9cIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5mZWF0ZXJMYXllci5vcGFjaXR5ID0gMC41O1xyXG4gICAgICAgICAgICB0aGlzLmZlYXRlckxheWVyLmRlZmluaXRpb25FeHByZXNzaW9uID0gXCIxPTJcIjtcclxuICAgICAgICAgICAgdGhpcy5mZWF0ZXJMYXllci5sYWJlbGluZ0luZm8gPSBbbGFiZWxDbGFzc107XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwb2x5Z29uc1NpbXBsZUZpbGxTeW1ib2wgPSBuZXcgU2ltcGxlRmlsbFN5bWJvbCgpO1xyXG4gICAgICAgICAgICBwb2x5Z29uc1NpbXBsZUZpbGxTeW1ib2wuY29sb3IgPSBDb2xvci5mcm9tU3RyaW5nKFwiYmx1ZVwiKTtcclxuICAgICAgICAgICAgcG9seWdvbnNTaW1wbGVGaWxsU3ltYm9sLm91dGxpbmUuY29sb3IgPSBDb2xvci5mcm9tU3RyaW5nKFwiYmx1ZVwiKTtcclxuICAgICAgICAgICAgcG9seWdvbnNTaW1wbGVGaWxsU3ltYm9sLm91dGxpbmUud2lkdGggPSAyO1xyXG4gICAgICAgICAgICBjb25zdCBmZWF0ZXJSZW5kZXJlciA9IG5ldyBTaW1wbGVSZW5kZXJlcigpO1xyXG4gICAgICAgICAgICBmZWF0ZXJSZW5kZXJlci5zeW1ib2wgPSBwb2x5Z29uc1NpbXBsZUZpbGxTeW1ib2w7XHJcbiAgICAgICAgICAgIGZlYXRlclJlbmRlcmVyLmxhYmVsID0gXCJ7VGVuZGVyTmFtZX1cIjsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHdlYk1hcC5hZGQodGhpcy5mZWF0ZXJMYXllcik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuY29udGFpbmVyID0gdGhpcy5tYXBWaWV3RWwubmF0aXZlRWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3Lm1hcCA9IHdlYk1hcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICBhbGVydCgnV2UgaGF2ZSBhbiBlcnJvcjogJyArIGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkgeyAgfVxyXG59Il19