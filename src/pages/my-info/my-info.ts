import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { ProvidersStudentProvider } from '../../providers/providers-student/providers-student';
import { Student } from '../../interfaces/stundent';


@Component({
  selector: 'page-my-info',
  templateUrl: 'my-info.html',
})
export class MyInfoPage {

  public student: Student;
  public testCount: number = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private _serviceStudent: ProvidersStudentProvider,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController
  ) {
    let loadingTests = this.loadingCtrl.create({
      content:'Obteniendo tu información...'
    });
    loadingTests.present();
    this._serviceStudent.getCountDocumentsTests().then((result)=>{
      result.subscribe((tests)=>{
        loadingTests.dismiss();
        this.testCount = tests.count || 0;
      },err=>{
        loadingTests.dismiss();
        this.toastCtrl.create({
          message:err,
          duration:3000
        }).present();
        this.navCtrl.pop();
      })
    })
    this._serviceStudent.getStudentInformation().then((student) => {
      this.student = student;
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
