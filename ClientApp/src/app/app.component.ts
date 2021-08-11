import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'yaaranutweb';
  mapCenter = [-122.4194, 37.7749];
  basemapType = 'streets';
  mapZoomLevel = 12;

  mapLoadedEvent(status: boolean) {
    console.log('The map has loaded: ' + status);
  }
}
