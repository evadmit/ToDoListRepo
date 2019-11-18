import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { hereMapApiKey } from 'src/environments/environment';
import { Coordinates } from '../models/todo';
import { Events } from '@ionic/angular';

declare var H: any;

@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss'],
})
export class HereMapComponent implements OnInit {
 

  @ViewChild("map",{static:false})
  public mapElement: ElementRef;
  isMarkerDraggable: boolean = true;
  private platform: any;
  private map: any;
  private location: Coordinates;

  public constructor(private readonly geolocation: Geolocation, public events: Events) {
    this.location = new Coordinates(0,0);
    events.subscribe('coordinates:setup', async (location) => {
      await this.setupLocationForDetails(location);
    });
  }

  public ngOnInit() {
    this.platform = new H.service.Platform({
      'apikey': hereMapApiKey
    });
  }

 async setupLocationForDetails(location: Coordinates) {
    this.isMarkerDraggable=false;
    this.location = location;
  }

  public ngAfterViewInit() {
    setTimeout(async () => {
      if(!this.location)
      {await this.initializeCurrentGeolocation();}

      this.createMap();

      this.addDragableMarker();

    }, 100);
  }

  public getSelectedLocation(): Coordinates {
    return this.location;
  }

  private async initializeCurrentGeolocation(): Promise<void> {
    const geoposition = await this.geolocation.getCurrentPosition();

    this.location.latitude = geoposition.coords.latitude;
    this.location.longitude = geoposition.coords.longitude;
  }

  private createMap(): void {
    let defaultLayers = this.platform.createDefaultLayers();

    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        zoom: 10,
        center: { lat: this.location.latitude, lng: this.location.longitude },
        
      }
    );
  }

  private addDragableMarker(): void {
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

    const marker = new H.map.Marker({ lat: this.location.latitude, lng: this.location.longitude }, {
      volatility: true
    });

    marker.draggable = this.isMarkerDraggable;
    this.map.addObject(marker);

    this.map.addEventListener('dragstart', (ev) => {
      var target = ev.target;
      if (target instanceof H.map.Marker) {
        behavior.disable();
      }
    }, false);

    this.map.addEventListener('dragend', (ev) => {
      var target = ev.target;
      if (target instanceof H.map.Marker) {
        behavior.enable();
        this.location.latitude = target.b.lat;
        this.location.longitude = target.b.lng;
        this.events.publish('location:changed', this.location);
      }
    }, false);

    this.map.addEventListener('drag', (ev) => {
      var target = ev.target,
        pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
        target.setGeometry(this.map.screenToGeo(pointer.viewportX, pointer.viewportY));
      }
    }, false);
  }
}