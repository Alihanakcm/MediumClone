import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable()
export class CommentService {

  constructor(private http: HttpClient) { }
  TOKEN_KEY = "token";
  newComment(userId, postId, comment): Observable<Response> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)
      })
    };
    return this.http.post<Response>(environment.url + "/comment?userId=" + userId + "&postId=" + postId, comment, httpOptions).pipe(catchError(this.handleError));
  }
  getComments(postId: number): Observable<Comment[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)
      })
    };
    return this.http.get<Comment[]>(environment.url + "/comments?postId=" + postId, httpOptions).pipe(catchError(this.handleError));

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
