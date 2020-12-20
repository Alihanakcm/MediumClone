import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable()
export class LikeService {

  constructor(private http: HttpClient) { }
  TOKEN_KEY = "token";
  likePost(postId, username): Observable<Response> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)
      })
    };
    return this.http.post<Response>(environment.url + "/like?postId=" + postId + "&username=" + username, {}, httpOptions).pipe(catchError(this.handleError));
  }
  removeLike(postId, username): Observable<Response> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)
      })
    };
    return this.http.delete<Response>(environment.url + "/like?postId=" + postId + "&username=" + username, httpOptions).pipe(catchError(this.handleError))
  }
  isLiked(postId, username): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)
      })
    };
    return this.http.get<boolean>(environment.url + "/like?postId=" + postId + "&username=" + username, httpOptions).pipe(catchError(this.handleError))
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
