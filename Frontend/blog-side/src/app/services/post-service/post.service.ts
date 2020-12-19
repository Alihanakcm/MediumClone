import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Post } from '../../entities/post';
@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }
  TOKEN_KEY = "token";

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.url + "/posts").pipe(
      catchError(this.handleError));
  }
  getsinglePost(postId): Observable<Post> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)
      })
    };
    return this.http.get<Post>(environment.url + "/post/" + postId, httpOptions).pipe(catchError(this.handleError));
  }
  newPost(post): Observable<Response> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)
      })
    };
    return this.http.post<Response>(environment.url + "/new-post", post, httpOptions).pipe(catchError(this.handleError));
  }
  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'Something went wrong' + err.message;
    } else {
      errorMessage = 'System-something went wrong ' + err.message;
    }
    return throwError(errorMessage);
  }
}
