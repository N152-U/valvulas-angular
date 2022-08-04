
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { loadModules } from "esri-loader";
import esri = __esri; // Esri TypeScript Types
@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss']
})
export class EsriMapComponent implements OnInit {

  @Output() mapLoadedEvent = new EventEmitter<boolean>();

  // The <div> where we will place the map
  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;

  /**
   * _zoom sets map zoom
   * _center sets map center
   * _basemap sets type of map
   * _loaded provides map loaded status
   */
  private _zoom = 10;
  private _center: Array<number> = [-99.1525698, 19.4211604];
  private _basemap = "topo-vector";
  private _loaded = false;
  private _view: esri.MapView = null;

  get mapLoaded(): boolean {
    return this._loaded;
  }

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

  constructor() {}

  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [EsriMap,  Collection,

        geometryEngine,

        /* arcgisUtils,LayerList,
         */
        Query, QueryTask, EsriMapView, SceneView,

        //Carga de objetos sobre mapa (El orden debe coincidir con el require)
        MapImageLayer, FeatureLayer, FeatureTable, LayerList,

        Polyline, Polygon, Extent, SimpleFillSymbol,
        SimpleLineSymbol, TextSymbol, Color, Graphic,
        //Clases tabla de datos
        Legend,Expand,OnDemandGrid,ColumnHider,Memory,StoreAdapter,Selection,

        //Utilerias para peticiones de datos e interaccion con el mapa
        esriRequest, esriConfig, declare,  JSON, dom, on, domClass, domConstruct] = await loadModules([
        "esri/Map",
        "esri/core/Collection",
           //Operaciones geoespaciales
           "esri/geometry/geometryEngine",

        "esri/tasks/support/Query",
        "esri/tasks/QueryTask",
        "esri/views/MapView",
        "esri/views/SceneView",
        "esri/layers/MapImageLayer",
        "esri/layers/FeatureLayer",
        "esri/widgets/FeatureTable",
        "esri/widgets/LayerList",

        "esri/geometry/Polyline",
        "esri/geometry/Polygon",
        "esri/geometry/Extent",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/TextSymbol",
        "esri/Color",
        "esri/Graphic",
          //Importaciones para tabla de datos
        "esri/widgets/Legend",
        "esri/widgets/Expand",
        "dgrid/OnDemandGrid",
        "dgrid/extensions/ColumnHider",
        "dgrid/Selection",



        "dojo/store/Memory",
        "dstore/legacy/StoreAdapter",
        "dojo/dom",
        "dojo/on",
        "dojo/dom-class",
        "dojo/dom-construct",
        "dojo/_base/array",
        //dojo/domReady! tiene que ir al final para la carga correcta
        "dojo/domReady!"
      ]);

      // Configure the Map
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap
      };

      const map: esri.Map = new EsriMap(mapProperties);

      // Initialize the MapView
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map,
        spatialReference: {
          wkid: 3857
      }
      };

      this._view = new SceneView(mapViewProperties);
      await this._view.when();
      return this._view;
    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  }

  ngOnInit() {
    // Initialize MapView and return an instance of MapView
    this.initializeMap().then(mapView => {
      // The map has been initialized
      console.log("mapView ready: ", this._view.ready);
      this._loaded = this._view.ready;
      this.mapLoadedEvent.emit(true);
    });
  }

  ngOnDestroy() {
    if (this._view) {
      // destroy the map view
      this._view.container = null;
    }
  }


}
