import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HereMapComponent } from '../here-map/here-map.component';
import { MapPage } from './map.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

const routes: Routes = [
  {
    path: '',
    component: MapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [MapPage, HereMapComponent],
  providers:[Geolocation]
})
export class MapPageModule {}
