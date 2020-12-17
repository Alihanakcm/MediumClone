import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/entities/user';
import { UserLogin } from 'src/app/entities/userLogin';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }
  register(user: User): Observable<Response> {
    return this.http.post<Response>(environment.url + "/register", user).pipe(catchError(this.handleError));
  }
  login(userLogin: UserLogin) {

    return this.http.post<UserLogin>(environment.url + "/login", { username: "alihanakcm", password: "123" })
      .pipe(catchError(this.handleError))
      .subscribe(res => console.log(res));
  }
  getUser(id) {

  }
  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'Something went wrong' + err.message + " status" + err.status + " status text" + err.statusText;
    } else {
      errorMessage = 'System-something went wrong ' + err.message + " status" + err.status + " status text" + err.statusText+" err.text"+err.error.text;
    }
    return throwError(errorMessage);
  }

}
