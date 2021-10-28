import { Injectable, isDevMode, Optional } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from './environments/environment';
import { environmentTest } from './environments/environment.test';
import { environmentProd } from './environments/environment.prod';

@Injectable()
export class YaaranutService {
  public apiUrl = "";
   
    constructor(@Optional() testBed: TestBed | null) {
        if (isDevMode()) {
            alert("isDevMode");
            this.apiUrl = environment.apiUrl;
        }
        else if (testBed !== null) {
            alert("testBed");
            this.apiUrl = environmentTest.apiUrl;
        }
        else {
            alert("Prod");
            this.apiUrl = environmentProd.apiUrl;
        }
        
    }
}
