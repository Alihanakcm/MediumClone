import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/entities/post';
import { PostService } from 'src/app/services/post-service/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
  providers: [PostService]
})
export class NewPostComponent implements OnInit {

  constructor(private postService: PostService, private formBuilder: FormBuilder) { }
  post = new Post();
  postForm: FormGroup;
  success: string;
  error: string;

  ngOnInit(): void {
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
      this.postService.newPost(this.post).subscribe(res => {
        if (res["res"] == 200)
          this.success = "Post başarılı bir şekilde kaydedilmiştir";
        else
          this.error = "Post oluştururken bir hata oluştu";
      });
    }
  }
}
