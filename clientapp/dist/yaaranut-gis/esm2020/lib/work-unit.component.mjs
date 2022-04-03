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
        this._z = "zz";
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
            featerRenderer.label = "{trtUnit}";
            const polygonsSimpleFillSymbol = new SimpleFillSymbol();
            polygonsSimpleFillSymbol.color = Color.fromString("green");
            polygonsSimpleFillSymbol.outline.color = Color.fromString("blue");
            polygonsSimpleFillSymbol.outline.width = 2;
            featerRenderer.symbol = polygonsSimpleFillSymbol;
            const labelClass = new LabelClass();
            labelClass.labelExpressionInfo = { expression: "$feature.trtUnit  " };
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
    }
    ngOnInit() {
    }
}
WorkUnitComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: WorkUnitComponent, deps: [{ token: i1.YaaranutService }], target: i0.ɵɵFactoryTarget.Component });
WorkUnitComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: WorkUnitComponent, selector: "YaaranutGis-workUnit", inputs: { zz: "zz", workUnits: "workUnits" }, outputs: { mapLoaded: "mapLoaded" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["mapViewNode1"], descendants: true, static: true }], ngImport: i0, template: `
  <div #mapViewNode1 style="width:100%;height: 100%;background-color:white"></div>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: WorkUnitComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'YaaranutGis-workUnit',
                    template: `
  <div #mapViewNode1 style="width:100%;height: 100%;background-color:white"></div>
  `,
                    styles: []
                }]
        }], ctorParameters: function () { return [{ type: i1.YaaranutService }]; }, propDecorators: { content: [{
                type: ViewChild,
                args: ['mapViewNode1', { static: true }]
            }], mapLoaded: [{
                type: Output
            }], zz: [{
                type: Input
            }], workUnits: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yay11bml0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL0xpYnJhcnlzL3NyYy9saWIvd29yay11bml0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV0RyxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLE9BQU8sTUFBTSw0QkFBNEIsQ0FBQztBQUNqRCxPQUFPLFlBQVksTUFBTSxrQ0FBa0MsQ0FBQztBQUM1RCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLFVBQVUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQWdDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEYsT0FBTyxLQUFLLE1BQU0sb0JBQW9CLENBQUM7QUFDdkMsT0FBTyxjQUFjLE1BQU0sdUNBQXVDLENBQUM7OztBQVduRSxNQUFNLE9BQU8saUJBQWlCO0lBVTVCLFlBQW9CLEVBQW1CO1FBQW5CLE9BQUUsR0FBRixFQUFFLENBQWlCO1FBTDdCLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBRTFDLGVBQVUsR0FBaUIsRUFBRSxDQUFDO1FBQzlCLGNBQVMsR0FBQyxJQUFJLENBQUM7UUFPZixPQUFFLEdBQVMsSUFBSSxDQUFDO1FBdURqQixnQkFBVyxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9DLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBMUQvQixDQUFDO0lBWEQsSUFBaUQsT0FBTyxDQUFDLE9BQW1CO1FBQzFFLElBQUksT0FBTyxFQUFFO1lBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7U0FBRTtJQUM1QyxDQUFDO0lBWUQsSUFDSSxFQUFF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O1lBQ3RELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztZQUcxQixtR0FBbUc7WUFDbkcsc0JBQXNCO1lBQ3RCLDhCQUE4QjtZQUM5QixLQUFLO1NBQ0w7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEIsS0FBSyxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxDQUFDO1NBQ3BDO0lBRUgsQ0FBQztJQUVELFFBQVE7SUFHUixDQUFDOzs4R0FySVUsaUJBQWlCO2tHQUFqQixpQkFBaUIsc1FBTmxCOztHQUVUOzJGQUlVLGlCQUFpQjtrQkFSN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUU7O0dBRVQ7b0JBQ0QsTUFBTSxFQUFFLEVBQ1A7aUJBQ0Y7c0dBR2tELE9BQU87c0JBQXZELFNBQVM7dUJBQUMsY0FBYyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFHakMsU0FBUztzQkFBbEIsTUFBTTtnQkFZSCxFQUFFO3NCQURMLEtBQUs7Z0JBV0YsU0FBUztzQkFEWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgV2ViTWFwIGZyb20gXCJAYXJjZ2lzL2NvcmUvV2ViTWFwXCI7XHJcbmltcG9ydCBNYXBWaWV3IGZyb20gXCJAYXJjZ2lzL2NvcmUvdmlld3MvTWFwVmlld1wiO1xyXG5pbXBvcnQgRmVhdHVyZUxheWVyIGZyb20gXCJAYXJjZ2lzL2NvcmUvbGF5ZXJzL0ZlYXR1cmVMYXllclwiO1xyXG5pbXBvcnQgQmFzZW1hcCBmcm9tIFwiQGFyY2dpcy9jb3JlL0Jhc2VtYXBcIjtcclxuaW1wb3J0IExhYmVsQ2xhc3MgZnJvbSBcIkBhcmNnaXMvY29yZS9sYXllcnMvc3VwcG9ydC9MYWJlbENsYXNzXCI7XHJcbmltcG9ydCB7IFNpbXBsZUZpbGxTeW1ib2wsIFNpbXBsZUxpbmVTeW1ib2wsIFRleHRTeW1ib2wgfSBmcm9tICdAYXJjZ2lzL2NvcmUvc3ltYm9scyc7XHJcbmltcG9ydCBDb2xvciBmcm9tICdAYXJjZ2lzL2NvcmUvQ29sb3InO1xyXG5pbXBvcnQgU2ltcGxlUmVuZGVyZXIgZnJvbSAnQGFyY2dpcy9jb3JlL3JlbmRlcmVycy9TaW1wbGVSZW5kZXJlcic7XHJcbmltcG9ydCB7IFlhYXJhbnV0U2VydmljZSB9IGZyb20gJy4uL3lhYXJhbnV0LnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdZYWFyYW51dEdpcy13b3JrVW5pdCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICA8ZGl2ICNtYXBWaWV3Tm9kZTEgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDogMTAwJTtiYWNrZ3JvdW5kLWNvbG9yOndoaXRlXCI+PC9kaXY+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXb3JrVW5pdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ21hcFZpZXdOb2RlMScsIHsgc3RhdGljOiB0cnVlIH0pIHNldCBjb250ZW50KGNvbnRlbnQ6IEVsZW1lbnRSZWYpIHtcclxuICAgIGlmIChjb250ZW50KSB7IHRoaXMubWFwVmlld0VsID0gY29udGVudDsgfVxyXG4gIH1cclxuICBAT3V0cHV0KCkgbWFwTG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gIHByaXZhdGUgbWFwVmlld0VsITogRWxlbWVudFJlZjtcclxuICBwcml2YXRlIF93b3JrVW5pdHM6IHN0cmluZ1tdID0gICAgIFtdO1xyXG4gIHByaXZhdGUgZmlyc3RUaW1lPXRydWU7IFxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHlzOiBZYWFyYW51dFNlcnZpY2UpIHtcclxuXHJcblxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfejogc3RyaW5nPVwienpcIjtcclxuICBASW5wdXQoKVxyXG4gIHNldCB6eih6eno6IHN0cmluZylcclxuICB7XHJcbiAgICB0aGlzLl96PXp6ejtcclxuICB9XHJcbiAgZ2V0IHp6KClcclxuICB7XHJcbiAgICByZXR1cm4gdGhpcy5fejtcclxuICB9XHJcbiAgXHJcbiAgQElucHV0KClcclxuICBzZXQgd29ya1VuaXRzKHdvcmtVbml0czogc3RyaW5nW10pIHtcclxuICAgIHRoaXMuX3dvcmtVbml0cyA9IHdvcmtVbml0cztcclxuXHJcbiAgICBpZiAodGhpcy5maXJzdFRpbWUpIFxyXG4gICAge1xyXG4gICAgICB0aGlzLmZpcnN0VGltZT1mYWxzZTtcclxuICAgICAgdGhpcy5pbml0aWFsaXplTWFwKCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBXb3JrVW5pdHNXaGVyZSA9IHdvcmtVbml0cy5tYXAoXHJcbiAgICAgIHdvcmtVbml0ID0+IFxyXG4gICAgICBcIidcIiArIHdvcmtVbml0ICsgXCInXCJcclxuICAgICAgKS5cclxuICAgICAgam9pbigpOyAgICBcclxuICAgIHRoaXMuZmVhdGVyTGF5ZXIuZGVmaW5pdGlvbkV4cHJlc3Npb24gPSBcIkdsb2JhbElEIGluIChcIiArIFdvcmtVbml0c1doZXJlICsgXCIpXCI7XHJcbiAgICBcclxuICAgIHRoaXMuZmVhdGVyTGF5ZXIud2hlbihcclxuICAgICAoKSA9PiB7XHJcbiAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMuZmVhdGVyTGF5ZXIuY3JlYXRlUXVlcnkoKTtcclxuICAgICAgIHF1ZXJ5Lm91dFNwYXRpYWxSZWZlcmVuY2UgPSB0aGlzLm1hcFZpZXcuc3BhdGlhbFJlZmVyZW5jZTtcclxuICAgICAgIHRoaXMuZmVhdGVyTGF5ZXIucXVlcnlGZWF0dXJlcygpLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICByZXNwb25zZS5mZWF0dXJlcy5mb3JFYWNoKGZlYXR1cmUgPT4ge1xyXG4gICAgICAgICAgIGNvbnN0IGF4enogPSBcIkRmZ2RcIjtcclxuICAgICAgICAgfSk7XHJcbiAgICAgICB9KTtcclxuICAgICAgIHRoaXMuZmVhdGVyTGF5ZXIucXVlcnlFeHRlbnQocXVlcnkpXHJcbiAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICBpZiAocmVzcG9uc2UuZXh0ZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmV4dGVudC5zcGF0aWFsUmVmZXJlbmNlPSB0aGlzLm1hcFZpZXcuc3BhdGlhbFJlZmVyZW5jZTtcclxuICAgICAgICAgICAgIHRoaXMubWFwVmlldy5nb1RvKHJlc3BvbnNlLmV4dGVudCkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7IGNvbnNvbGUuZXJyb3IoZXJyb3IpOyB9KTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgY29uc3QgRXNyaVB3b2VyQnllbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlc3JpLXVpIGNhbGNpdGUtdGhlbWUtbGlnaHRcIik7XHJcbiAgICAgICAgICAgLy9Fc3JpUHdvZXJCeWVsZW1lbnRzWzBdLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsXCJkaXNwbGF5Om5vbmVcIik7ICAgICAgICAgICBcclxuICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEVzcmlQd29lckJ5ZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgIEVzcmlQd29lckJ5ZWxlbWVudHNbaV0uc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5Om5vbmVcIik7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgIH0pO1xyXG4gIH1cclxuICBnZXQgd29ya1VuaXRzKCk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiB0aGlzLl93b3JrVW5pdHM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmVhdGVyTGF5ZXI6IEZlYXR1cmVMYXllciA9IG5ldyBGZWF0dXJlTGF5ZXIoKTtcclxuICBwdWJsaWMgbWFwVmlldyA9IG5ldyBNYXBWaWV3KCk7XHJcbiAgXHJcbiAgIFxyXG4gIGFzeW5jIGluaXRpYWxpemVNYXAoKSB7XHJcbiAgICBjb25zdCB3ZWJNYXAgPSBuZXcgV2ViTWFwKHtcclxuICAgICBiYXNlbWFwOiBcInRvcG9cIixcclxuICAgICAvL3BvcnRhbEl0ZW06IHtcclxuICAgICAvLyAgLy91cmw6XCJodHRwczovL3NlcnZpY2VzMi5hcmNnaXMuY29tL3V0Tk5ybVhiNElaT0xYWHMvQXJjR0lTL3Jlc3Qvc2VydmljZXMvSk5GSUxGb3Jlc3QvRmVhdHVyZVNlcnZlci8wL3F1ZXJ5XCJcclxuICAgICAvLyAgaWQ6IFwic3RyZWV0c1wiXHJcbiAgICAgLy99XHJcbiAgICB9KTtcclxuICAgIGxldCBiYXNlbWFwID0gbmV3IEJhc2VtYXAoe1xyXG4gICAgIHBvcnRhbEl0ZW06IHtcclxuICAgICAgIC8vdXJsOlwiXCJcclxuICAgICAgIGlkOiBcInN0cmVldHNcIiAgLy8gV0dTODQgU3RyZWV0cyBWZWN0b3Igd2VibWFwXHJcbiAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAvLyB0aGlzLmZlYXRlckxheWVyID0gbmV3IEZlYXR1cmVMYXllcih7IHVybDogXCJodHRwOi8vbG9jYWxob3N0OjI3NTUyL3V0Tk5ybVhiNElaT0xYWHMvQXJjR0lTL3Jlc3Qvc2VydmljZXMvVGVzdF9LS0xGb3Jlc3RNYW5hZ2VtZW50VW5pdHMvRmVhdHVyZVNlcnZlci8wL3F1ZXJ5XCIgfSk7XHJcbiAgICAgIHRoaXMuZmVhdGVyTGF5ZXIgPSBuZXcgRmVhdHVyZUxheWVyKHtcclxuICAgICAgICAgIHVybDogdGhpcy55cy5hcGlVcmwgKyBcIi9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9LS0xGb3Jlc3RNYW5hZ2VtZW50VW5pdHMvRmVhdHVyZVNlcnZlci8wXCIgICAgICAgICAgXHJcbiAgICAgIH0pO1xyXG4gICAgIHRoaXMuZmVhdGVyTGF5ZXIub3BhY2l0eSA9IDAuNTtcclxuICAgICB0aGlzLmZlYXRlckxheWVyLmRlZmluaXRpb25FeHByZXNzaW9uID0gXCIxPTJcIjtcclxuICAgICAvL3RoaXMuZmVhdGVyTGF5ZXIuZGlzcGxheUZpZWxkID0gXCJGT1JfTk9cIjtcclxuICAgICAvL3RoaXMuZmVhdGVyTGF5ZXIubGFiZWxzVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgLy90aGlzLmZlYXRlckxheWVyLmxlZ2VuZEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgIC8vdGhpcy5mZWF0ZXJMYXllci5vdXRGaWVsZHMgPSBbXCJGT1JfTk9cIl07XHJcbiAgICAgLy90aGlzLmZlYXRlckxheWVyLnBvcHVwRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgY29uc3QgZmVhdGVyUmVuZGVyZXIgPSBuZXcgU2ltcGxlUmVuZGVyZXIoKTtcclxuICAgICAgICBmZWF0ZXJSZW5kZXJlci5sYWJlbCA9IFwie3RydFVuaXR9XCI7XHJcbiAgICAgY29uc3QgcG9seWdvbnNTaW1wbGVGaWxsU3ltYm9sID0gbmV3IFNpbXBsZUZpbGxTeW1ib2woKTtcclxuICAgICBwb2x5Z29uc1NpbXBsZUZpbGxTeW1ib2wuY29sb3IgPSBDb2xvci5mcm9tU3RyaW5nKFwiZ3JlZW5cIik7XHJcbiAgICAgcG9seWdvbnNTaW1wbGVGaWxsU3ltYm9sLm91dGxpbmUuY29sb3IgPSBDb2xvci5mcm9tU3RyaW5nKFwiYmx1ZVwiKTtcclxuICAgICBwb2x5Z29uc1NpbXBsZUZpbGxTeW1ib2wub3V0bGluZS53aWR0aCA9IDI7XHJcbiAgICAgZmVhdGVyUmVuZGVyZXIuc3ltYm9sID0gcG9seWdvbnNTaW1wbGVGaWxsU3ltYm9sO1xyXG4gICAgIGNvbnN0IGxhYmVsQ2xhc3MgPSBuZXcgTGFiZWxDbGFzcygpO1xyXG4gICAgICAgIGxhYmVsQ2xhc3MubGFiZWxFeHByZXNzaW9uSW5mbyA9IHsgZXhwcmVzc2lvbjogXCIkZmVhdHVyZS50cnRVbml0ICBcIiB9O1xyXG4gICAgIHRoaXMuZmVhdGVyTGF5ZXIubGFiZWxpbmdJbmZvID0gW2xhYmVsQ2xhc3NdO1xyXG4gICAgIHRoaXMuZmVhdGVyTGF5ZXIucmVuZGVyZXIgPSBmZWF0ZXJSZW5kZXJlcjtcclxuICAgICB3ZWJNYXAuYWRkKHRoaXMuZmVhdGVyTGF5ZXIpO1xyXG5cclxuXHJcbiAgICAgdGhpcy5tYXBWaWV3LmNvbnRhaW5lciA9IHRoaXMubWFwVmlld0VsLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgdGhpcy5tYXBWaWV3Lm1hcCA9IHdlYk1hcDtcclxuXHJcblxyXG4gICAgIC8vKGF3YWl0IG1hcFZpZXcud2hlbkxheWVyVmlldyhmZWF0ZXJMYXllcikpLmZpbHRlci53aGVyZSA9IFwiR2xvYmFsSUQgPSAnXCIgKyB0aGlzLl9maWx0ZXJbMF0gKyBcIidcIjtcclxuICAgICAvL21hcFZpZXcud2hlbigoKSA9PiB7XHJcbiAgICAgLy8gIHRoaXMubWFwTG9hZGVkLmVtaXQodHJ1ZSk7XHJcbiAgICAgLy99KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgIGFsZXJ0KCdXZSBoYXZlIGFuIGVycm9yOiAnICsgZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgIFxyXG4gICAgXHJcbiAgfVxyXG5cclxufVxyXG4iXX0=