import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, MenuController } from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from "../pages/login/login";
import { HomePage } from '../pages/home/home';
import { ProvidersStorageProvider } from '../providers/providers-storage/providers-storage';
import { MyInfoPage } from '../pages/my-info/my-info';
import { TestsPage } from '../pages/tests/tests';
import { TestPage } from '../pages/test/test';
import { timer } from "rxjs/observable/timer";

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  appMenuItems: Array<MenuItem>;
  showSplash =  true;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private _storage:ProvidersStorageProvider,
    private menuCtrl:MenuController
  ) {
    this.initializeApp();
    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'},
      // {title: 'Local Weather', component: LocalWeatherPage, icon: 'partly-sunny'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();
      timer(3000).subscribe(()=>this.showSplash = false);
    });
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
  logOut(){
    this._storage.deleteTokenStorage();
    this.menuCtrl.close();
    this.nav.setRoot(LoginPage);
  }
  myInfo(){
    this.menuCtrl.close();
    this.nav.push(MyInfoPage);
  }
  testsDone(){
    this.menuCtrl.close();
    this.nav.push(TestsPage);
  }
  doTheTest(){
    this.menuCtrl.close();
    this.nav.push(TestPage);
  }
}
