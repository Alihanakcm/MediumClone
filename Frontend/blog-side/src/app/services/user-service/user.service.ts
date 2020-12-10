import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/entities/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }
  register(user: User) {
    this.http.post<User>(environment.url + "/register", user).pipe(catchError(this.handleError)).subscribe(res => console.log(res));
  }
  login(userLogin): Observable<JSON> {

    return this.http.post<JSON>(environment.url + "/login", { username: "alihanakcm", password: "123" }).pipe(catchError(this.handleError));
  }
  getUser(id) {

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
