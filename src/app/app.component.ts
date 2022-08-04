import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'correspondencia-dg-sass';
    // Set our map properties
    mapCenter = [-99.1525698, 19.4211604];
    basemapType = 'topo-vector';
    mapZoomLevel = 12;
  
    // See app.component.html
    mapLoadedEvent(status: boolean) {
      console.log('The map loaded: ' + status);
    }
}
