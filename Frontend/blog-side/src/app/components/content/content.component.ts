import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/entities/post';
import { PostService } from 'src/app/services/post-service/post.service';
import { CommentService } from 'src/app/services/comment-service/comment.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { LikeService } from 'src/app/services/like-service/like.service';
import { User } from 'src/app/entities/user';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [PostService, CommentService, LikeService],
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit {

  constructor(private postService: PostService, private likeService: LikeService, private userService: UserService, private commentService: CommentService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { }
  singlePost: Post;
  commentForm: FormGroup;
  comment = new Comment();
  success: string;
  comments: Comment[];
  user: User;
  postId: number;
  liked: boolean = false;
  likeCount: number;

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data[0];
    });
    this.createCommentForm();
    this.activatedRoute.params.subscribe(params => {
      this.postId = params["postId"];
      this.postService.getsinglePost(params["postId"]).subscribe(data => {
        this.singlePost = data;
        this.likeCount = data[0].likeCount;
      });
      this.commentService.getComments(params["postId"]).subscribe(data => {
        this.comments = data;
      });
      this.likeService.isLiked(this.postId, this.userService.getUserName()).subscribe(data => {
        this.liked = data["res"];
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
      this.commentService.newComment(this.user["id"], this.singlePost[0].id, this.comment).subscribe(res => {
        if (res["res"] == 200) {
          this.singlePost[0].commentCount += 1;
          this.success = "Yorumunuz başarılı bir şekilde kaydedildi";
          this.comment["username"] = this.user["username"];
          this.comments.push(this.comment);
        }
      });
    }
  }
  like(isLike: boolean, postId: number, userId: number) {
    this.liked = isLike;
    if (isLike) {
      this.likeCount += 1;
      this.likeService.likePost(postId, this.user.username).subscribe();
    }
    else {
      this.likeCount -= 1;
      this.likeService.removeLike(postId, this.user.username).subscribe();
    }
  }
}
