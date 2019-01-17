import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
//Plugins
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {IonicStorageModule} from '@ionic/storage';

//Pages
import {MyApp} from "./app.component";

import {RegisterPage} from "../pages/register/register";
import { LoginPage } from '../pages/login/login';

//Services
import { ServicesApiProvider } from '../providers/services-api/services-api';
import { ServicesNetworkProvider } from '../providers/services-network/services-network';
import { ServicesOfflineManagerProvider } from '../providers/services-offline-manager/services-offline-manager';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ServicesApiProvider,
    ServicesNetworkProvider,
    ServicesOfflineManagerProvider,
  ]
})

export class AppModule {
}
