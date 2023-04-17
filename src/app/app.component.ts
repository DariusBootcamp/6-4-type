import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Set our map properties
  mapCenter = [108.21147547864406, 16.06505300439531];
  basemapType = 'osm';
  mapZoomLevel = 18;

  mapLoadedEvent(status: boolean) {
    console.log('The map has loaded: ' + status);
  }
}
