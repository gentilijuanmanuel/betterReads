import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  login(email: string, pass: string) {
    return this.http.post(
      'http://localhost:3000/api/user/login',
      { email: email, password: pass }
    )
    .map(
      response => {
        return response.json();
      })
    .do(
      (response) => {
        localStorage.setItem('token', response.token);
      }
    )
  }
}