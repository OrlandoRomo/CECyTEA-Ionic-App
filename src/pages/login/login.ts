import { Component } from "@angular/core";
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { RegisterPage } from "../register/register";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { StudentLogin } from '../../interfaces/studentLogin';
import { ProvidersAuthProvider } from '../../providers/providers-auth/providers-auth';
import { HomePage } from '../home/home';
import { ProvidersStorageProvider } from '../../providers/providers-storage/providers-storage';
import {map} from 'rxjs/operators';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public studentForm: FormGroup;
  public loginStudent: StudentLogin;
  constructor(public nav: NavController,
    private toastCtrl: ToastController,
    private _auth: ProvidersAuthProvider,
    private loadingCtrl: LoadingController,
    private _storage:ProvidersStorageProvider) {
    //Build the student form method
    this.buildStudentForm();

  }
  buildStudentForm() {
    this.studentForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  signIn() {
    this.loginStudent = this.studentForm.value;
    let loadingAuth = this.loadingCtrl.create({
      content: 'Autenticando...'
    });
    loadingAuth.present();
    this._auth.checkUser(this.loginStudent).subscribe((info: any) => {
      loadingAuth.dismiss();
      this._storage.setTokenStorage(info);
      this.nav.setRoot(HomePage);
    }, err => {
      loadingAuth.dismiss();
      this.toastCtrl.create({
        message: `${err}`,
        duration: 3000
      }).present();
      this.studentForm.reset();
    });
  }
  register() {
    this.nav.push(RegisterPage);
  }
}
