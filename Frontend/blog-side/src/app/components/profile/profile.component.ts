import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }
  user: User=new User();
  ngOnInit(): void {
    document.body.className = "bg";
    this.userService.getCurrentUser().subscribe(data => { this.user = data[0] });
  }
  ngOnDestroy(): void {
    document.body.className = "";
  }
}
