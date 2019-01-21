import { Component } from "@angular/core";
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from '../../interfaces/stundent';
import { ProvidersStudentProvider } from '../../providers/providers-student/providers-student';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  public gradeList: string[] = ['1', '2', '3', '4', '5', '6'];
  public groupList: string[] = ['A', 'B', 'C', 'D', 'F', 'G', 'H'];
  public newStudentForm: FormGroup;
  public newUser: Student;
  constructor(
    public nav: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private _studentService: ProvidersStudentProvider
  ) {
    this.buildNewStudentForm();
  }

  buildNewStudentForm() {
    this.newStudentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required)
    })
  }

  register() {
    this.newUser = this.newStudentForm.value;
    let loading = this.loadingCtrl.create({
      content: 'Enviando información...'
    });
    loading.present();
    this._studentService.addNewStudent(this.newUser).subscribe(() => {
      loading.dismiss();
      this.nav.setRoot(LoginPage);
    }, err => {
      loading.dismiss();
      this.toastCtrl.create({
        message: err,
        duration: 3000,
        position:'bottom'
      }).present();
      this.newStudentForm.reset();
    });
  }

  // I have already an account
  login() {
    this.nav.setRoot(LoginPage);
  }
}
