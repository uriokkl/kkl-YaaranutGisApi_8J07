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
            this.apiUrl = environment.apiUrl;
            this.apiUrl = environmentTest.apiUrl;
        }
        else if (testBed !== null) {
            this.apiUrl = environmentTest.apiUrl;
        }
        else {
            this.apiUrl = environmentProd.apiUrl;
        }
        
    }
}
