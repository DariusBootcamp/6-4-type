import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Set our map properties
  mapCenter = [108.1995630043371, 16.062252173662465];
  basemapType = 'osm';
  mapZoomLevel = 15;

  mapLoadedEvent(status: boolean) {
    console.log('The map has loaded: ' + status);
  }
}
