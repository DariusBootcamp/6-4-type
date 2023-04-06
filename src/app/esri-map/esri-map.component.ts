
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { loadModules } from 'esri-loader';
import { setDefaultOptions } from 'esri-loader';
import esri = __esri;

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {

  @Output() mapLoaded = new EventEmitter<boolean>();
  @ViewChild('mapViewNode', { static: true })
  private mapViewEl!: ElementRef;

  /**
   * @private _zoom sets map zoom
   * @private _center sets map center
   * @private _basemap sets type of map
   */
  private _zoom: number = 10;
  private _center: Array<number> = [0.1278, 51.5074];
  private _basemap: string = 'osm';

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

  constructor() { }

  async initializeMap() {
    try {
      // setDefaultOptions({ version: '4.13' });
      const [EsriMap, EsriMapView,
        // Draw,
        SimpleMarkerSymbol, SimpleLineSymbol,
        SimpleFillSymbol,
        // CartographicLineSymbol,
        // Graphic,
        Color,
        Polygon
        // dom,
        // on
      ] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        // "esri/toolbars/draw",
        "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        // "esri/symbols/CartographicLineSymbol",
        // "esri/graphic",
        "esri/geometry/Polygon",
        "esri/Color",
        // "dojo/dom",
        // "dojo/on",
        // "dojo/domReady!"
      ]);

      // Set type of map
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap
      };

      const map: esri.Map = new EsriMap(mapProperties);

      // Set type of map view
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map
      };

      const mapView: esri.MapView = new EsriMapView(mapViewProperties);


      // // markerSymbol is used for point and multipoint, see http://raphaeljs.com/icons/#talkq for more examples
      // var markerSymbol = new SimpleMarkerSymbol();
      // markerSymbol.setPath("M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772,18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z");
      // markerSymbol.setColor(new Color("#00FFFF"));

      // // lineSymbol used for freehand polyline, polyline and line.
      // var lineSymbol = new CartographicLineSymbol(
      //   CartographicLineSymbol.STYLE_SOLID,
      //   new Color([255,0,0]), 10,
      //   CartographicLineSymbol.CAP_ROUND,
      //   CartographicLineSymbol.JOIN_MITER, 5
      // );

      // // fill symbol used for extent, polygon and freehand polygon, use a picture fill symbol
      // // the images folder contains additional fill images, other options: sand.png, swamp.png or stiple.png

      // var fillSymbol = new SimpleFillSymbol(
      //     SimpleFillSymbol.STYLE_SOLID,
      //     new SimpleLineSymbol(
      //       SimpleLineSymbol.STYLE_SOLID,
      //       new Color('#000'),
      //       1
      //     ),
      //     new Color([0, 255, 0, 0.2])
      //   );

        // function initToolbar() {
        //   var tb = new Draw(map);
        //   tb.on("draw-end", addGraphic);

        //   // event delegation so a click handler is not
        //   // needed for each individual button
        //   on(dom.byId("info"), "click", function(evt) {
        //     if ( evt.target.id === "info" ) {
        //       return;
        //     }
        //     var tool = evt.target.id.toLowerCase();
        //     map.disableMapNavigation();
        //     tb.activate(tool);
        //   });
        // }

        // function addGraphic(evt) {
        //   //deactivate the toolbar and clear existing graphics
        //   tb.deactivate();
        //   map.enableMapNavigation();

        //   // figure out which symbol to use
        //   var symbol;
        //   if ( evt.geometry.type === "point" || evt.geometry.type === "multipoint") {
        //     symbol = markerSymbol;
        //   } else if ( evt.geometry.type === "line" || evt.geometry.type === "polyline") {
        //     symbol = lineSymbol;
        //   }
        //   else {
        //     symbol = fillSymbol;
        //   }

        //   map.graphics.add(new Graphic(evt.geometry, symbol));
        // }


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
