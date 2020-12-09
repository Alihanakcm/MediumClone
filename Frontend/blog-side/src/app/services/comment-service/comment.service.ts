import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable()
export class CommentService {

  constructor(private http:HttpClient) { }

  newComment(userId,postId,comment){}
}
