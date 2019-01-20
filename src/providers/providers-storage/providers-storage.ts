import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ProvidersStorageProvider {

  constructor(private storage: Storage) {

  }
  setTokenStorage(user:any){
    this.storage.set('student',JSON.stringify(user));
  }
  deleteTokenStorage(){
    this.storage.clear();
  }

}
