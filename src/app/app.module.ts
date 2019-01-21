import { NgModule } from "@angular/core";
import { IonicApp, IonicModule } from "ionic-angular";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

//Plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';

//Pages
import { MyApp } from "./app.component";
import { HomePage } from '../pages/home/home';
import { RegisterPage } from "../pages/register/register";
import { LoginPage } from '../pages/login/login';
import { MyInfoPage } from '../pages/my-info/my-info';
import { TestsPage } from '../pages/tests/tests';
import { ChartPage } from '../pages/chart/chart';

//Chart js 
import {ChartsModule} from 'ng2-charts';
//Services
import { ServicesNetworkProvider } from '../providers/services-network/services-network';
import { ProvidersAuthProvider } from '../providers/providers-auth/providers-auth';
import { ProvidersStudentProvider } from '../providers/providers-student/providers-student';
import { ProvidersStorageProvider } from '../providers/providers-storage/providers-storage';
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    MyInfoPage,
    TestsPage,
    ChartPage
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
    IonicStorageModule.forRoot(),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    MyInfoPage,
    TestsPage,
    ChartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    ServicesNetworkProvider,
    ProvidersAuthProvider,
    ProvidersStudentProvider,
    ProvidersStorageProvider,
  ]
})

export class AppModule {
}
