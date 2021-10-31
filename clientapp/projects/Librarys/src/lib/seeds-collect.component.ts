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
  selector: 'YaaranutGis-SeedsCollect',
  template: `
    <div #mapViewSeedsCollect style="width:100%;height: 100%;background-color:green"></div>
  `,
  styles: [
  ]   
})
export class SeedsCollectComponent implements OnInit {

  private mapViewEl!: ElementRef;
  private _SeedsCollects: string[] = [];
  private firstTime = true;

  @ViewChild('mapViewSeedsCollect', { static: true }) set content(content: ElementRef) {
    if (content) { this.mapViewEl = content; }
  }
  @Output() mapLoaded = new EventEmitter<boolean>();
  
    
  @Input()
  set seedsCollects(SeedsCollects: string[]) {
     
    this._SeedsCollects = SeedsCollects;
   
    if (this.firstTime) {
      this.firstTime = false;
      this.initializeMap();
    }
    let SeedsCollectsWhere =""
    this._SeedsCollects.forEach(
      SeedsCollect =>
        SeedsCollectsWhere += "GlobalID_2 ='" + SeedsCollect + "' or "
    );
    SeedsCollectsWhere += "1=2"
    this.featerLayer.definitionExpression =  SeedsCollectsWhere  ;     
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
  get seedsCollects(): string[] {
    return this._SeedsCollects;
  }

  public featerLayer: FeatureLayer = new FeatureLayer();
  public mapView = new MapView();
  constructor(private ys: YaaranutService) {


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
      featerRenderer.label = "{Site}" ;
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
    } catch (error) {
      console.error(error);
      alert('We have an error: ' + error);
    }

  }

  ngOnInit() {


  }

}
