import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HereMapComponent } from './here-map.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';



@NgModule({
  declarations: [HereMapComponent],
  imports: [
    CommonModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports:[HereMapComponent],
  providers:[Geolocation]
})
export class HereMapModule { }
