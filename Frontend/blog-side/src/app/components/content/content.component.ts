import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/entities/post';
import { PostService } from 'src/app/services/post-service/post.service';
import { CommentService } from 'src/app/services/comment-service/comment.service';
import { UserService } from 'src/app/services/user-service/user.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [PostService, CommentService]
})
export class ContentComponent implements OnInit {

  constructor(private postService: PostService, private userService: UserService, private commentService: CommentService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { }
  singlePost: Post;
  commentForm: FormGroup;
  comment = new Comment();
  success: string;
  comments: Comment[];
  user: number;


  ngOnInit(): void {
    if (this.isAuthenticated)
      this.router.navigateByUrl("/login-register");
    this.userService.getCurrentUser().subscribe(data => { this.user = data[0] });
    this.createCommentForm();
    this.activatedRoute.params.subscribe(params => {
      this.postService.getsinglePost(params["postId"]).subscribe(data => {
        this.singlePost = data;
        
      });
      this.commentService.getComments(params["postId"]).subscribe(data => {
        this.comments = data
      });
    });
  }
  get isAuthenticated() {
    return this.userService.loggedIn();
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
      this.commentService.newComment(this.user["id"], this.singlePost[0].id, this.comment).subscribe(res => {
        if (res["res"] == 200) {
          this.singlePost[0].commentCount+=1;
          this.success = "Yorumunuz başarılı bir şekilde kaydedildi";
          this.comment["username"] = this.user["username"];
          this.comments.push(this.comment);
        }
      });
    }
  }

}
