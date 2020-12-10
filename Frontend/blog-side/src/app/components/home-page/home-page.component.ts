import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post-service/post.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers:[PostService]
})
export class HomePageComponent implements OnInit {

  constructor(private postService:PostService) { }

  ngOnInit(): void {
    // this.postService.getPosts();
  }

}
