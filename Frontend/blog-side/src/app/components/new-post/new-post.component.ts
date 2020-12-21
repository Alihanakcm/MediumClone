import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/entities/post';
import { User } from 'src/app/entities/user';
import { PostService } from 'src/app/services/post-service/post.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { CKEditor4 } from 'ckeditor4-angular'
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
  providers: [PostService],
  encapsulation: ViewEncapsulation.None
})
export class NewPostComponent implements OnInit {

  constructor(private postService: PostService, private userService: UserService, private formBuilder: FormBuilder) { }
  post = new Post();
  postForm: FormGroup;
  success: string;
  error: string;
  user: User;
  ngOnInit(): void {
    this.createPostForm();
    this.userService.getCurrentUser().subscribe(data => { this.user = data });
  }
  createPostForm() {
    this.postForm = this.formBuilder.group({
      title: ["", Validators.required],
      content: ["", Validators.required]
    });
  }
  addPost() {
    if (this.postForm.valid) {
      this.post = Object.assign(this.postForm.value);
      this.post.userId = this.user[0].id
      this.postService.newPost(this.post).subscribe(res => {
        if (res["res"] == 200)
          this.success = "Post başarılı bir şekilde kaydedilmiştir";
        else
          this.error = "Post oluştururken bir hata oluştu";
      });
    }
  }
}
