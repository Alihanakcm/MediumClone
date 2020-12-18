import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/entities/post';
import { PostService } from 'src/app/services/post-service/post.service';
import { CommentService } from 'src/app/services/comment-service/comment.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [PostService, CommentService]
})
export class ContentComponent implements OnInit {

  constructor(private postService: PostService, private commentService: CommentService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }
  singlePost: Post;
  commentForm: FormGroup;
  comment = new Comment();
  success:string;
  ngOnInit(): void {
    this.createCommentForm();
    this.activatedRoute.params.subscribe(params => {
      this.postService.getsinglePost(params["postId"]).subscribe(data => {
        this.singlePost = data;
        console.log(this.singlePost[0].id)

      });
    });
  }

  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      comment: ["", Validators.required],
      name: ["", Validators.required],
    })
  }
  sendComment() {
    if (this.commentForm.valid) {
      this.comment = Object.assign({}, this.commentForm.value);
      this.commentService.newComment(this.singlePost[0].userId, this.singlePost[0].id, this.comment).subscribe(res => {
        if (res["res"] == 200)
          this.success = "Yorumunuz başarılı bir şekilde kaydedildi";
      });
    }
  }
}
