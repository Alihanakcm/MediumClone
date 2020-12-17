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
  error:string;
  registerForm: FormGroup;
  user: User = new User();
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      fullName: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }
  ngOnInit(): void {
    this.createRegisterForm();
    //this.userService.register(user);

    //this.userService.login();
  }
  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.userService.register(this.user).subscribe(res => {
        console.log(res);
        
      });
    }
  }
}
