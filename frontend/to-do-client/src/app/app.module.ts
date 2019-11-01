import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthModule } from  './services/auth.module';

import { HTTP_INTERCEPTORS, HttpClientModule }    from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthGuardService } from './services/auth-guard.service';

import { InterceptorService } from './interceptor.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
 
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
 
import { IonicStorageModule } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SqliteService } from './services/sqlite.service';
import { NetworkService } from './services/network.service';
import { Network } from '@ionic-native/network/ngx';

@NgModule({
  declarations: [
    AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,  
    HttpClientModule,
    AuthModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
    ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    AuthGuardService,
    Network,
    StatusBar,
    Geolocation,
    SplashScreen,
    { provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    NativeStorage,
    Camera,
    File,
    WebView,
    SQLite
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
