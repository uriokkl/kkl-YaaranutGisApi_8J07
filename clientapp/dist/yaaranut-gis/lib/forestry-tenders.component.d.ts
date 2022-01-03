import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { YaaranutService } from '../yaaranut.service';
import * as i0 from "@angular/core";
export declare class ForestryTendersComponent implements OnInit {
    private ys;
    featerLayer: FeatureLayer;
    mapView: MapView;
    private mapViewEl;
    private _ForestryTenders;
    private firstTime;
    set content(content: ElementRef);
    mapLoaded: EventEmitter<boolean>;
    set ForestryTenders(ForestryTenders: string[]);
    get ForestryTenders(): string[];
    constructor(ys: YaaranutService);
    initializeMap(): Promise<void>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ForestryTendersComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ForestryTendersComponent, "YaaranutGis-ForestryTenders", never, { "ForestryTenders": "ForestryTenders"; }, { "mapLoaded": "mapLoaded"; }, never, never>;
}
