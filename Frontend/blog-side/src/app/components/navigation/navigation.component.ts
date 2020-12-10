import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { UserLogin } from '../../entities/userLogin';
import { User } from '../../entities/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [UserService]
})
export class NavigationComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    var userLogin = new UserLogin();
    userLogin._username = "alihanakcm";
    userLogin._password = "123";
    var user = new User();
    user.full_name = "asd asd";
    user.email = "asdsasassdsda@yandex.com",
      user.password = "123";
    user.username = "qwasdassdewe";
    this.userService.register(user);

    // this.userService.login(userLogin).subscribe();
  }

}
