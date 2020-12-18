import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { UserLogin } from '../../entities/userLogin';
import { User } from '../../entities/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [UserService]
})
export class NavigationComponent implements OnInit {

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  isLogin = true;
  error: string;
  success: string;
  registerForm: FormGroup;
  loginForm: FormGroup;
  user: User = new User();
  userLogin: UserLogin = new UserLogin();

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      fullName: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  ngOnInit(): void {
    this.createRegisterForm();
    this.createLoginForm();
  }
  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.userService.register(this.user).subscribe(res => {
        if (res["res"] != 200)
          this.error = res["res"];
        else
          this.success = "Kaydınız başarıyla yapılmıştır";
      });
    }
  }
  asd() {
    if (this.loginForm.valid) {
      this.userLogin = Object.assign({}, this.loginForm.value);
      this.userService.login(this.userLogin).subscribe(res => {
        console.log(res);
      });
    }
  }
}
