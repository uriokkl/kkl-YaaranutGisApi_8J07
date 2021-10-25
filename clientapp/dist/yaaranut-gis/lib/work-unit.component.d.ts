import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { YaaranutService } from '../yaaranut.service';
import * as i0 from "@angular/core";
export declare class WorkUnitComponent implements OnInit {
    private ys;
    set content(content: ElementRef);
    mapLoaded: EventEmitter<boolean>;
    private mapViewEl;
    private _workUnits;
    private firstTime;
    constructor(ys: YaaranutService);
    private _z;
    set zz(zzz: string);
    get zz(): string;
    set workUnits(workUnits: string[]);
    get workUnits(): string[];
    featerLayer: FeatureLayer;
    mapView: MapView;
    initializeMap(): Promise<void>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkUnitComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WorkUnitComponent, "YaaranutGis-workUnit", never, { "zz": "zz"; "workUnits": "workUnits"; }, { "mapLoaded": "mapLoaded"; }, never, never>;
}
