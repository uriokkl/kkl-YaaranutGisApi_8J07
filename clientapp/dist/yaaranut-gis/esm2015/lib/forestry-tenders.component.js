import { __awaiter } from "tslib";
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
ForestryTendersComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: ForestryTendersComponent, deps: [{ token: i1.YaaranutService }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: function () { return [{ type: i1.YaaranutService }]; }, propDecorators: { content: [{
                type: ViewChild,
                args: ['mapViewForestryTenders', { static: true }]
            }], mapLoaded: [{
                type: Output
            }], ForestryTenders: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZXN0cnktdGVuZGVycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9MaWJyYXJ5cy9zcmMvbGliL2ZvcmVzdHJ5LXRlbmRlcnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV0RyxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLE9BQU8sTUFBTSw0QkFBNEIsQ0FBQztBQUVqRCxPQUFPLFlBQVksTUFBTSxrQ0FBa0MsQ0FBQztBQUU1RCxPQUFPLFVBQVUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQWdDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEYsT0FBTyxLQUFLLE1BQU0sb0JBQW9CLENBQUM7QUFDdkMsT0FBTyxjQUFjLE1BQU0sdUNBQXVDLENBQUM7OztBQVduRSxNQUFNLE9BQU8sd0JBQXdCO0lBbURqQyxZQUFvQixFQUFtQjtRQUFuQixPQUFFLEdBQUYsRUFBRSxDQUFpQjtRQWpEaEMsZ0JBQVcsR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMvQyxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUV2QixxQkFBZ0IsR0FBYSxFQUFFLENBQUM7UUFDaEMsY0FBUyxHQUFHLElBQUksQ0FBQztRQUdmLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBMENQLENBQUM7SUEzQzVDLElBQTJELE9BQU8sQ0FBQyxPQUFtQixJQUFJLElBQUksT0FBTyxFQUFFO1FBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7S0FBRSxDQUFFLENBQUM7SUFHdkksSUFDSSxlQUFlLENBQUMsZUFBeUI7UUFFekMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGVB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LE1BQU0sQ0FBQyxDQUFDO2dCQUNsRSx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztnQkFDNUMsY0FBYyxDQUFDLE1BQU0sR0FBRyx3QkFBd0IsQ0FBQztnQkFDakQsY0FBYyxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUM7Z0JBRXRDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUU3QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO2FBQzdCO1lBQ0QsT0FBTyxLQUFLLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckIsS0FBSyxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxDQUFDO2FBQ3ZDO1FBRUwsQ0FBQztLQUFBO0lBRUQsUUFBUSxLQUFNLENBQUM7O3FIQXhGTix3QkFBd0I7eUdBQXhCLHdCQUF3Qix5UkFOekI7O0dBRVQ7MkZBSVUsd0JBQXdCO2tCQVJwQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3pDLFFBQVEsRUFBRTs7R0FFVDtvQkFDRCxNQUFNLEVBQUUsRUFDUDtpQkFDRjtzR0FTOEQsT0FBTztzQkFBakUsU0FBUzt1QkFBQyx3QkFBd0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBQzNDLFNBQVM7c0JBQWxCLE1BQU07Z0JBR0gsZUFBZTtzQkFEbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgV2ViTWFwIGZyb20gXCJAYXJjZ2lzL2NvcmUvV2ViTWFwXCI7XG5pbXBvcnQgTWFwVmlldyBmcm9tIFwiQGFyY2dpcy9jb3JlL3ZpZXdzL01hcFZpZXdcIjtcbmltcG9ydCBlc3JpQ29uZmlnIGZyb20gXCJAYXJjZ2lzL2NvcmUvY29uZmlnXCI7XG5pbXBvcnQgRmVhdHVyZUxheWVyIGZyb20gXCJAYXJjZ2lzL2NvcmUvbGF5ZXJzL0ZlYXR1cmVMYXllclwiO1xuaW1wb3J0IEJhc2VtYXAgZnJvbSBcIkBhcmNnaXMvY29yZS9CYXNlbWFwXCI7XG5pbXBvcnQgTGFiZWxDbGFzcyBmcm9tIFwiQGFyY2dpcy9jb3JlL2xheWVycy9zdXBwb3J0L0xhYmVsQ2xhc3NcIjtcbmltcG9ydCB7IFNpbXBsZUZpbGxTeW1ib2wsIFNpbXBsZUxpbmVTeW1ib2wsIFRleHRTeW1ib2wgfSBmcm9tICdAYXJjZ2lzL2NvcmUvc3ltYm9scyc7XG5pbXBvcnQgQ29sb3IgZnJvbSAnQGFyY2dpcy9jb3JlL0NvbG9yJztcbmltcG9ydCBTaW1wbGVSZW5kZXJlciBmcm9tICdAYXJjZ2lzL2NvcmUvcmVuZGVyZXJzL1NpbXBsZVJlbmRlcmVyJztcbmltcG9ydCB7IFlhYXJhbnV0U2VydmljZSB9IGZyb20gJy4uL3lhYXJhbnV0LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1lhYXJhbnV0R2lzLUZvcmVzdHJ5VGVuZGVycycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAjbWFwVmlld0ZvcmVzdHJ5VGVuZGVycyBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OiAxMDAlO2JhY2tncm91bmQtY29sb3I6d2hpdGVcIj48L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRm9yZXN0cnlUZW5kZXJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHB1YmxpYyBmZWF0ZXJMYXllcjogRmVhdHVyZUxheWVyID0gbmV3IEZlYXR1cmVMYXllcigpO1xuICAgIHB1YmxpYyBtYXBWaWV3ID0gbmV3IE1hcFZpZXcoKTtcbiAgICBwcml2YXRlIG1hcFZpZXdFbCE6IEVsZW1lbnRSZWY7XG4gICAgcHJpdmF0ZSBfRm9yZXN0cnlUZW5kZXJzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHByaXZhdGUgZmlyc3RUaW1lID0gdHJ1ZTtcblxuICAgIEBWaWV3Q2hpbGQoJ21hcFZpZXdGb3Jlc3RyeVRlbmRlcnMnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXQgY29udGVudChjb250ZW50OiBFbGVtZW50UmVmKSB7IGlmIChjb250ZW50KSB7IHRoaXMubWFwVmlld0VsID0gY29udGVudDsgfSAgfVxuICAgIEBPdXRwdXQoKSBtYXBMb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBGb3Jlc3RyeVRlbmRlcnMoRm9yZXN0cnlUZW5kZXJzOiBzdHJpbmdbXSkge1xuXG4gICAgICAgIHRoaXMuX0ZvcmVzdHJ5VGVuZGVycyA9IEZvcmVzdHJ5VGVuZGVycztcblxuICAgICAgICBpZiAodGhpcy5maXJzdFRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMuZmlyc3RUaW1lID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVNYXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbGV0IEZvcmVzdHJ5VGVuZGVyc1doZXJlID0gXCJcIiAgICAgICAgXG4gICAgICAgIC8vdGhpcy5fRm9yZXN0cnlUZW5kZXJzLmZvckVhY2goXG4gICAgICAgIC8vICAgIEZvcmVzdHJ5VGVuZGVycyA9PiB7XG4gICAgICAgIC8vICAgICAgICBpZiAoRm9yZXN0cnlUZW5kZXJzV2hlcmUgIT09IFwiXCIpIEZvcmVzdHJ5VGVuZGVyc1doZXJlICs9IFwiIG9yIFwiO1xuICAgICAgICAvLyAgICAgICAgRm9yZXN0cnlUZW5kZXJzV2hlcmUgKz0gXCJHbG9iYWxJRCA9J1wiICsgRm9yZXN0cnlUZW5kZXJzICsgXCInXCJcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvLyk7XG4gICAgICAgIGNvbnN0IEZvcmVzdHJ5VGVuZGVyc1doZXJlID0gXCJHbG9iYWxJRD0nXCIgKyB0aGlzLl9Gb3Jlc3RyeVRlbmRlcnMuam9pbihcIicgb3IgR2xvYmFsSUQ9J1wiKSArIFwiJ1wiXG4gICAgICAgIHRoaXMuZmVhdGVyTGF5ZXIuZGVmaW5pdGlvbkV4cHJlc3Npb24gPSBGb3Jlc3RyeVRlbmRlcnNXaGVyZTtcbiAgICAgICAgdGhpcy5mZWF0ZXJMYXllci53aGVuKFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5mZWF0ZXJMYXllci5jcmVhdGVRdWVyeSgpO1xuICAgICAgICAgICAgICAgIHF1ZXJ5Lm91dFNwYXRpYWxSZWZlcmVuY2UgPSB0aGlzLm1hcFZpZXcuc3BhdGlhbFJlZmVyZW5jZTsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5mZWF0ZXJMYXllci5xdWVyeUV4dGVudChxdWVyeSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmV4dGVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmV4dGVudC5zcGF0aWFsUmVmZXJlbmNlID0gdGhpcy5tYXBWaWV3LnNwYXRpYWxSZWZlcmVuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmdvVG8ocmVzcG9uc2UuZXh0ZW50KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHsgY29uc29sZS5lcnJvcihlcnJvcik7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIEVzcmlQd29lckJ5ZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZXNyaS11aSBjYWxjaXRlLXRoZW1lLWxpZ2h0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBFc3JpUHdvZXJCeWVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRXNyaVB3b2VyQnllbGVtZW50c1tpXS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImRpc3BsYXk6bm9uZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IEZvcmVzdHJ5VGVuZGVycygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9Gb3Jlc3RyeVRlbmRlcnM7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgeXM6IFlhYXJhbnV0U2VydmljZSkgeyB9XG4gICAgYXN5bmMgaW5pdGlhbGl6ZU1hcCgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHdlYk1hcCA9IG5ldyBXZWJNYXAoe1xuICAgICAgICAgICAgICAgIGJhc2VtYXA6IFwidG9wb1wiLCAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgY29uc3QgbGFiZWxDbGFzcyA9IG5ldyBMYWJlbENsYXNzKCk7XG4gICAgICAgICAgICBsYWJlbENsYXNzLmxhYmVsRXhwcmVzc2lvbkluZm8gPSB7IGV4cHJlc3Npb246IFwiJGZlYXR1cmUuVGVuZGVyTmFtZSArICcsICcgKyAgJGZlYXR1cmUuU3ViVGVuZGVySUQgKyAnLCAnICsgICRmZWF0dXJlLlN1YlRlbmRlclllYXIgXCIgfTtcblxuICAgICAgICAgICAgdGhpcy5mZWF0ZXJMYXllciA9IG5ldyBGZWF0dXJlTGF5ZXIoe1xuICAgICAgICAgICAgICAgIHVybDogdGhpcy55cy5hcGlVcmwgKyBcIi9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9Gb3Jlc3RyeVRlbmRlcnMvRmVhdHVyZVNlcnZlci8xL1wiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZmVhdGVyTGF5ZXIub3BhY2l0eSA9IDAuNTtcbiAgICAgICAgICAgIHRoaXMuZmVhdGVyTGF5ZXIuZGVmaW5pdGlvbkV4cHJlc3Npb24gPSBcIjE9MlwiO1xuICAgICAgICAgICAgdGhpcy5mZWF0ZXJMYXllci5sYWJlbGluZ0luZm8gPSBbbGFiZWxDbGFzc107XG5cbiAgICAgICAgICAgIGNvbnN0IHBvbHlnb25zU2ltcGxlRmlsbFN5bWJvbCA9IG5ldyBTaW1wbGVGaWxsU3ltYm9sKCk7XG4gICAgICAgICAgICBwb2x5Z29uc1NpbXBsZUZpbGxTeW1ib2wuY29sb3IgPSBDb2xvci5mcm9tU3RyaW5nKFwiYmx1ZVwiKTtcbiAgICAgICAgICAgIHBvbHlnb25zU2ltcGxlRmlsbFN5bWJvbC5vdXRsaW5lLmNvbG9yID0gQ29sb3IuZnJvbVN0cmluZyhcImJsdWVcIik7XG4gICAgICAgICAgICBwb2x5Z29uc1NpbXBsZUZpbGxTeW1ib2wub3V0bGluZS53aWR0aCA9IDI7XG4gICAgICAgICAgICBjb25zdCBmZWF0ZXJSZW5kZXJlciA9IG5ldyBTaW1wbGVSZW5kZXJlcigpO1xuICAgICAgICAgICAgZmVhdGVyUmVuZGVyZXIuc3ltYm9sID0gcG9seWdvbnNTaW1wbGVGaWxsU3ltYm9sO1xuICAgICAgICAgICAgZmVhdGVyUmVuZGVyZXIubGFiZWwgPSBcIntUZW5kZXJOYW1lfVwiOyAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB3ZWJNYXAuYWRkKHRoaXMuZmVhdGVyTGF5ZXIpO1xuXG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuY29udGFpbmVyID0gdGhpcy5tYXBWaWV3RWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5tYXAgPSB3ZWJNYXA7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIGFsZXJ0KCdXZSBoYXZlIGFuIGVycm9yOiAnICsgZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHsgIH1cbn0iXX0=