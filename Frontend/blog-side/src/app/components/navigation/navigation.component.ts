import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [UserService]
})
export class NavigationComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  ngOnInit(): void {
  }

  get username() {
    return this.userService.getCurrentUser();
  }
  get isAuthenticated() {
    return this.userService.loggedIn();
  }
  logOut() {
    this.userService.logOut();
    this.router.navigateByUrl('/home');
  }
}
