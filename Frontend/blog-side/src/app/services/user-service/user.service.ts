import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/entities/user';
import { UserLogin } from 'src/app/entities/userLogin';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }
  userId: number;
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  TOKEN_KEY = "token";
  register(user: User): Observable<Response> {
    return this.http.post<Response>(environment.url + "/register", user).pipe(catchError(this.handleError));
  }

  login(userLogin: UserLogin): Observable<Response> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<Response>(environment.url + "/login", userLogin, httpOptions).pipe(catchError(this.handleError))
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  loggedIn() {
    return this.jwtHelper.isTokenExpired(this.token);
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token)
  }
  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserName() {
    return this.jwtHelper.decodeToken(this.token).user.username;
  }
  getCurrentUser(): Observable<User> {
    const username = this.getUserName();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)
      })
    };
    return this.http.get<User>(environment.url + "/user/" + username, httpOptions).pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'Something went wrong' + err.message + " status" + err.status + " status text" + err.statusText;
    } else {
      errorMessage = 'System-something went wrong ' + err.message + " status" + err.status + " status text" + err.statusText + " err.text" + err.error.text;
    }
    return throwError(errorMessage);
  }

}
