import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Student } from '../../interfaces/stundent';

@Injectable()
export class ProvidersStorageProvider {

  constructor(private storage: Storage) {

  }
  setTokenStorage(user: any) {
    this.storage.set('student', JSON.stringify(user));
  }
  deleteTokenStorage() {
    this.storage.clear();
  }
  getStudentInfo(){
    return this.storage.get('student').then((student)=>{
      return JSON.parse(student).person;
    })
  }
  getStudentId(){
    return this.storage.get('student').then((student)=>{
      return JSON.parse(student)['person']._id;
    })
  }
  getToken(){
    return this.storage.get('student').then((student)=>{
      return JSON.parse(student).token;
    });
  }
}
