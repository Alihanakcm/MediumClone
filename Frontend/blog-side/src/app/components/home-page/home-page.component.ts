import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/entities/post';
import { UserService } from 'src/app/services/user-service/user.service';
import { PostService } from '../../services/post-service/post.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [PostService],
})
export class HomePageComponent implements OnInit {

  constructor(private postService: PostService, private userService: UserService, private router: Router) { }
  allPosts: Post[];
  filterText: string;
  ngOnInit(): void {
    this.postService.getPosts().subscribe(data => {
      this.allPosts = data;
    });
  }
  get isAuthenticated() {
    return this.userService.loggedIn();
  }
  readMore(id: number) {
    if (!this.isAuthenticated)
      this.router.navigateByUrl('/post/' + id);
    else
      this.router.navigateByUrl("/login-register");
  }
}
