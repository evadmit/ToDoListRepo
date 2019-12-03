import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IonicStorageModule } from '@ionic/storage';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NewToDoPage } from '../components/new-to-do/new-to-do.page';
import { HereMapModule } from '../components/here-map/here-map.module';

const routes: Routes = [
  {
    path: '',
    component: NewToDoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    HereMapModule,
    IonicStorageModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [NewToDoPage],
  providers: [Geolocation]
})
export class NewToDoPageModule { }
