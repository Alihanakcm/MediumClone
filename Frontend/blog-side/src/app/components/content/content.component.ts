import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/entities/post';
import { PostService } from 'src/app/services/post-service/post.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [PostService]
})
export class ContentComponent implements OnInit {

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute) { }
  singlePost: Post;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.postService.getsinglePost(params["postId"]).subscribe(data => {
        this.singlePost = data;
      });
    });
  }
}
