import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Basemap from "@arcgis/core/Basemap";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import { SimpleFillSymbol, SimpleLineSymbol, TextSymbol } from '@arcgis/core/symbols';
import Color from '@arcgis/core/Color';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import { YaaranutService } from '../yaaranut.service';

@Component({
    selector: 'YaaranutGis-ForestryTenders',
  template: `
    <div #mapViewForestryTenders style="width:100%;height: 100%;background-color:white"></div>
  `,
  styles: [
  ]
})
export class ForestryTendersComponent implements OnInit {

    public featerLayer: FeatureLayer = new FeatureLayer();
    public mapView = new MapView();
    private mapViewEl!: ElementRef;
    private _ForestryTenders: string[] = [];
    private firstTime = true;

    @ViewChild('mapViewForestryTenders', { static: true }) set content(content: ElementRef) { if (content) { this.mapViewEl = content; }  }
    @Output() mapLoaded = new EventEmitter<boolean>();

    @Input()
    set ForestryTenders(ForestryTenders: string[]) {

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
        const ForestryTendersWhere = "GlobalID='" + this._ForestryTenders.join("' or GlobalID='") + "'"
        this.featerLayer.definitionExpression = ForestryTendersWhere;
        this.featerLayer.when(
            () => {
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
    get ForestryTenders(): string[] {
        return this._ForestryTenders;
    }
    
    constructor(private ys: YaaranutService) { }
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

    ngOnInit() {  }
}