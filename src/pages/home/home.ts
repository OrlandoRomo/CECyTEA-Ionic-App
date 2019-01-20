import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProvidersStorageProvider } from '../../providers/providers-storage/providers-storage';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  constructor(public navCtrl: NavController, public navParams: NavParams, private _storage:ProvidersStorageProvider) {

  }

  logOut(){
    console.log('Se eliminó el token');
    
    // this._storage.deleteTokenStorage();
    // this.navCtrl.setRoot(LoginPage);
  }

}
