import { Component } from "@angular/core";
import { NavController, MenuController } from "ionic-angular";
import { RegisterPage } from "../register/register";
import { FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public studentForm: FormGroup;
  constructor(public nav: NavController, public menu: MenuController) {
    this.menu.swipeEnable(false);
    this.buildStudentForm();
  }
  buildStudentForm() {
    this.studentForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  register() {
    this.nav.setRoot(RegisterPage);
  }

  login() {

  }

}
