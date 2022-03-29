import { Inject, Injectable, isDevMode, Optional } from '@angular/core';
import { TestBed } from '@angular/core/testing';


@Injectable()
export class YaaranutService {
  public apiUrl = "";
   
    constructor(@Inject('environmentFile') private config: any ) {
        this.apiUrl = config.GisApiUrl
       //this.apiUrl = 'https://kkl-yaaranutgisapi.azurewebsites.net';
    }
}
