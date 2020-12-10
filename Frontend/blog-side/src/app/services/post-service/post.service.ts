import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get(environment.url + "/posts").pipe(catchError(this.handleError)).subscribe(data => {
      console.log(data);

    })

  }
  newPost(userId, title, content) { }
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
