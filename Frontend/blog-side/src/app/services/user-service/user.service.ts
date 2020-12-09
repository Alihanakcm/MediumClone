import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }
  register(user) {
  }
  login(username, password) {

  }
  getUser(id) {

  }

}
