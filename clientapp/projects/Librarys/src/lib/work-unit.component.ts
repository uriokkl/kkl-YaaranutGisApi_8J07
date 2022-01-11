import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Basemap from "@arcgis/core/Basemap";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import { SimpleFillSymbol, SimpleLineSymbol, TextSymbol } from '@arcgis/core/symbols';
import Color from '@arcgis/core/Color';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import { YaaranutService } from '../yaaranut.service';

@Component({
  selector: 'YaaranutGis-workUnit',
  template: `
  <div #mapViewNode style="width:100%;height: 100%;background-color:white"></div>
  `,
  styles: [
  ]
})
export class WorkUnitComponent implements OnInit {

  @ViewChild('mapViewNode', { static: true }) set content(content: ElementRef) {
    if (content) { this.mapViewEl = content; }
  }
  @Output() mapLoaded = new EventEmitter<boolean>();
  private mapViewEl!: ElementRef;
  private _workUnits: string[] = [];
  private firstTime=true; 

  constructor(private ys: YaaranutService) {


  }

  private _z: string="z";
  @Input()
  set zz(zzz: string)
  {
    this._z=zzz;
  }
  get zz()
  {
    return this._z;
  }
  
  @Input()
  set workUnits(workUnits: string[]) {
    this._workUnits = workUnits;

    if (this.firstTime) 
    {
      this.firstTime=false;
      this.initializeMap();
    }
    const WorkUnitsWhere = workUnits.map(
      workUnit => 
      "'" + workUnit + "'"
      ).
      join();    
    this.featerLayer.definitionExpression = "GlobalID in (" + WorkUnitsWhere + ")";
    
    this.featerLayer.when(
     () => {
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
            response.extent.spatialReference= this.mapView.spatialReference;
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
  get workUnits(): string[] {
    return this._workUnits;
  }

  public featerLayer: FeatureLayer = new FeatureLayer();
  public mapView = new MapView();
  
   
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
       id: "streets"  // WGS84 Streets Vector webmap
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
     polygonsSimpleFillSymbol.color = Color.fromString("green");
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
    } catch (error) {
      console.error(error);
     alert('We have an error: ' + error);
    }

  }

  ngOnInit() {
     
    
  }

}
