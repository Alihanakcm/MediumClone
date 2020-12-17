import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Post } from '../../entities/post';
@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': "Bearer eyJhbGciOaiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsaWhhbmFrY20iLCJpYXQiOjE2MDc2MTYyMDMsImV4cCI6MTYwNzYxODAwM30._T2qURo5davZzadkk1nFVvIwgpkcsr3-7dEX_FS9qx4"
    //   })
    // };
    return this.http.get<Post[]>(environment.url + "/posts").pipe(
      tap(result => console.log(result)),
      catchError(this.handleError));
  }
  getsinglePost(postId): Observable<Post> {
    return this.http.get<Post>(environment.url + "/post/" + postId).pipe(catchError(this.handleError));
  }
  newPost(userId, title, content) {
    // this.http.post(environment.url)
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
