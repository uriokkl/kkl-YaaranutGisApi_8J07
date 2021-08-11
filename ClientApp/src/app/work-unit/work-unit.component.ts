import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

//import WebMap from "@arcgis/core/WebMap";
//import Map from "@arcgis/core/Map";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
//import { loadModules } from 'esri-loader';
//import esri = __esri;

@Component({
  selector: 'app-work-unit',
  templateUrl: './work-unit.component.html',
  styleUrls: ['./work-unit.component.css']
})
/** WorkUnit component*/
export class WorkUnitComponent implements OnInit {

  @Output() mapLoaded = new EventEmitter<boolean>();
  //@ViewChild('mapViewNode', { static: true }) private mapViewEl?: ElementRef;
  //@ViewChild('mapViewNode', { static: true }) private mapViewEl?: ElementRef;
  private mapViewEl!: ElementRef;

  @ViewChild('mapViewNode', { static: true }) set content(content: ElementRef) {
    if (content) { // initially setter gets called with undefined
      this.mapViewEl = content;
    }
  }
  /**
   * @private _zoom sets map zoom
   * @private _center sets map center
   * @private _basemap sets type of map
   */
  private _zoom: number = 10;
  private _center: Array<number> = [0.1278, 51.5074];
  private _basemap: string = 'streets';

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  constructor() {

  }

  async initializeMap() {
    try {
      // setDefaultOptions({ version: '4.13' });
      //const [EsriMap, EsriMapView] = await  loadModules([
      //  'esri/Map',
      //  'esri/views/MapView'
      //]);

      //// Set type of map
      //const mapProperties: esri.MapProperties = {
      //  basemap: this._basemap
      //};


      //const map: esri.Map = new EsriMap(mapProperties);
      //const map1 = new Map(mapProperties);
      const webMap = new WebMap({
        //basemap:  this._basemap,

        portalItem: {
          //id: "56b5bd522c52409c90d902285732e9f1",
          url: "https://services2.arcgis.com/utNNrmXb4IZOLXXs/ArcGIS/rest/services/Test_service_9804e1f94e74442fa91c3faaa6c134a7/FeatureServer/0"

        },
      });
      //webMap.add(new FeatureLayer({ url: "https://services2.arcgis.com/utNNrmXb4IZOLXXs/arcgis/rest/services/JNFFieldCenterBuildingsPublicView/FeatureServer/0" }));
      webMap.add(new FeatureLayer({ url: "http://localhost:27552/WorkUnit/GetWorkUnitTipul" }));
      
      // Set type of map view
      //const mapViewProperties: esri.MapViewProperties = {
      //  container: this.mapViewEl.nativeElement,
      //  center: this._center,
      //  zoom: this._zoom,
      //  map: map
      //};

      //const mapView: esri.MapView = new EsriMapView(mapViewProperties);
      const mapView = new MapView();
      mapView.container = this.mapViewEl.nativeElement;
      //mapView.center = new __esri.Point(0.1278, 51.5074);
      mapView.zoom = this._zoom;
      mapView.map = webMap;


      // All resources in the MapView and the map have loaded.
      // Now execute additional processes
      mapView.when(() => {
        this.mapLoaded.emit(true);
      });
    } catch (error) {
      alert('We have an error: ' + error);
    }

  }

  ngOnInit() {
    this.initializeMap();
  }

}
