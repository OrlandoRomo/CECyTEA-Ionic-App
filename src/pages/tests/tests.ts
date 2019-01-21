import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { ProvidersStudentProvider } from '../../providers/providers-student/providers-student';
import { ChartPage } from '../chart/chart';

@IonicPage()
@Component({
  selector: 'page-tests',
  templateUrl: 'tests.html',
})
export class TestsPage {

  public testsList: any[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private _student: ProvidersStudentProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
    let loadingTests = this.loadingCtrl.create({
      content: 'Cargando tests hechos...'
    });
    loadingTests.present();
    this._student.getTestsDone().then((result) => {
      result.subscribe((tests) => {
        loadingTests.dismiss();
        this.testsList = tests.testsDB;
        console.log(this.testsList);
      },err=>{
        loadingTests.dismiss();
        this.testsList = [];
        this.toastCtrl.create({
          message:err,
          duration:3000
        }).present();
      });
    });
  }

  deleteTest(id: string) {
    let loadingDelete = this.loadingCtrl.create({
      content: 'Borrando test...'
    });
    this.alertCtrl.create({
      title: 'Borrar test',
      message: '¿Estás seguro de borrar este test?',
      buttons: [{
        text: 'Si',
        handler: () => {
          loadingDelete.present();
          this._student.deleteTest(id).then((result) => {
            result.subscribe(() => {
              loadingDelete.dismiss();
              this.navCtrl.push(TestsPage);
              this.navCtrl.remove(this.navCtrl.length() - 1);
            });
          })
        }
      }, 'No']
    }).present();
  }
  deleteAllTests() {
    let loadingDelete = this.loadingCtrl.create({
      content: 'Borrando todo los tests...'
    });
    this.alertCtrl.create({
      title: 'Borrar tests',
      message: '¿Estás seguro de borrar todos los tests?',
      buttons: [{
        text: 'Si',
        handler: () => {
          loadingDelete.present();
          this._student.deleteAllTest().then((result) => {
            result.subscribe(() => {
              loadingDelete.dismiss();
              this.navCtrl.push(TestsPage);
              this.navCtrl.remove(this.navCtrl.length() - 1);
            });
          })
        }
      }, 'No']
    }).present();
  }
  testDetails(test:any){
    this.navCtrl.push(ChartPage,{test:test});
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
