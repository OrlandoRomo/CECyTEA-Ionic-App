import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  public gradeList: string[]=['1','2','3','4','5','6'];
  public groupList: string[] = ['A','B','C','D','F','G','H'];
  public newStudentForm: FormGroup;
  constructor(public nav: NavController) {
    this.buildNewStudentForm();
  }

  buildNewStudentForm(){
    this.newStudentForm = new FormGroup({
      name: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      grade: new FormControl('',Validators.required),
      group: new FormControl('',Validators.required)
    })
  }
  // register and go to home page
  register() {
    // this.nav.setRoot(HomePage);
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
