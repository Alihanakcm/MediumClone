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
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {

  constructor(private postService: PostService, private userService: UserService, private router: Router) { }
  allPosts: Post[];
  filterText: string;
  ngOnInit(): void {
    document.body.className = "bg";
    this.postService.getPosts().subscribe(data => {
      this.allPosts = data;
    });
  }
  ngOnDestroy(): void {
    document.body.className = "";
  }
}
