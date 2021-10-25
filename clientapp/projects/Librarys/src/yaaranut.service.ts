import { Injectable } from '@angular/core';
import { environment } from './environments/environment';

@Injectable()
export class YaaranutService {
  public apiUrl = "";
   
  constructor() {
    this.apiUrl = environment.apiUrl;
    }
}
