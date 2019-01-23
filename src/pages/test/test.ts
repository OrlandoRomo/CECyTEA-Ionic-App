import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Subscription, Observable } from 'rxjs';
import { ProvidersStudentProvider } from '../../providers/providers-student/providers-student';
import { Tests } from '../../interfaces/test';

@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  ticks = 0;
  minutesDisplay: number = 0;
  hoursDisplay: number = 0;
  secondsDisplay: number = 0;
  sub: Subscription;
  counter = 3;
  timer: any;
  listQuestions: any[] = [];
  listOfAnswers: string[] = [];
  testObject: Tests;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private _studentService: ProvidersStudentProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
    let loadingNewTest = this.loadingCtrl.create({
      content:'Cargando preguntas...'
    });
    loadingNewTest.present();
    this._studentService.getNewRandomTest().then((result) => {
      result.subscribe((questions: any) => {
        loadingNewTest.dismiss();
        this.listQuestions = questions.questionsDB
      },err=>{
        loadingNewTest.dismiss();
        this.toastCtrl.create({
          message:err,
          duration:3000
        }).present();
        this.navCtrl.pop();
      });
      this.startTimer();
    })
  }

  getAnswerByQuestion(answer: string, index: number) {
    this.listOfAnswers[index] = answer;
  }
  sendAnswers() {
    let loadingSendAnswers = this.loadingCtrl.create({
      content: 'Enviando respuestas...'
    })
    this.stopTimer();
    let time = `${this.hoursDisplay}:${this.minutesDisplay}:${this.secondsDisplay}`;
    this.testObject = this._studentService.getGradeForTheTest(this.listOfAnswers, this.listQuestions, time);
    loadingSendAnswers.present();
    this._studentService.saveNewTest(this.testObject).then((result) => {
      result.subscribe((test) => {
        loadingSendAnswers.dismiss();
        this.toastCtrl.create({
          message: '¡Respuestas enviadas correctamente!',
          duration:3000
        }).present();
        this.viewCtrl.dismiss();
      }, err => {
        loadingSendAnswers.dismiss();
        this.toastCtrl.create({
          message: err,
          duration:3000
        }).present();
      })
    })
  }
  private startTimer() {

    let timer = Observable.timer(1, 1000);
    this.sub = timer.subscribe(
      t => {
        this.ticks = t;

        this.secondsDisplay = this.getSeconds(this.ticks);
        this.minutesDisplay = this.getMinutes(this.ticks);
        this.hoursDisplay = this.getHours(this.ticks);
      }
    );
  }
  private stopTimer() {
    this.sub.unsubscribe();
  }
  private getSeconds(ticks: number) {
    return this.pad(ticks % 60);
  }

  private getMinutes(ticks: number) {
    return this.pad((Math.floor(ticks / 60)) % 60);
  }

  private getHours(ticks: number) {
    return this.pad(Math.floor((ticks / 60) / 60));
  }

  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }

  dismiss() {
    this.alertCtrl.create({
      message: '¿Estás seguro de cancelar el test? Se borrarán tus respuestas.',
      buttons: [{
        text: 'Si',
        handler: () => {
          this.stopTimer();
          this.viewCtrl.dismiss();
        }
      }, 'Cancelar']
    }).present();
  }
}
