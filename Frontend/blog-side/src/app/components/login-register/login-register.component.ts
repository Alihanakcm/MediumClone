import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { UserLogin } from '../../entities/userLogin';
import { User } from '../../entities/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
  providers: [UserService]
})
export class LoginRegisterComponent implements OnInit {

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  error: string;
  success: string;
  registerForm: FormGroup;
  loginForm: FormGroup;
  user: User = new User();
  userLogin: UserLogin = new UserLogin();
  jwtHelper: JwtHelperService = new JwtHelperService();


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
      username: ["", Validators.required],
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
  loginOperation() {
    if (this.loginForm.valid) {
      this.userLogin = Object.assign({}, this.loginForm.value);
      this.userService.login(this.userLogin).subscribe(res => {
        if (res["res"]["token"] != undefined) {
          this.userService.saveToken(res["res"]["token"]);
          this.userService.userToken = res["res"]["token"];
          this.userService.decodedToken = this.jwtHelper.decodeToken(res["res"]["token"]);
          this.router.navigateByUrl('/home');
        }
        else if (res["res"] == 401)
          this.error = "Kullanıcı adı ya da şifreniz hatalı! Lütfen bilgilerinizi kontrol ediniz.";
        else
          this.error = "Bir hata oluştu! Daha sonra tekrar deneyiniz.";
      });
    }
  }

}
