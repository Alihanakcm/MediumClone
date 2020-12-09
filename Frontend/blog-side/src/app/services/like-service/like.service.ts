import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable()
export class LikeService {

  constructor(private http: HttpClient) { }
  likePost(postId, userId) { }
  removeLike(likeId) { }
}
