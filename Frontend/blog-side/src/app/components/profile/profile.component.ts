import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }
  user: User=new User();
  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(data => { this.user = data[0] });
  }
}
