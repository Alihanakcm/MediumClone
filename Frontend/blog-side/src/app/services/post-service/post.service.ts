import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts() {

  }
  newPost(userId, title, content) { }

}
