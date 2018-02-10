import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  authChange = new Subject<boolean>();

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
        localStorage.setItem('id', response.id);
        localStorage.setItem('name', response.name);
        localStorage.setItem('surname', response.surname);
        localStorage.setItem('expires_at', response.expires);

        this.authChange.next(true);
      }
    )
  }

  signup(newUser) {
    return this.http.post(
      'http://localhost:3000/api/user/signup',
      newUser
    )
    .map(
      response => response.json(),
      error => console.log(error)
    );
  }

  logout () {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    localStorage.removeItem('expires_at');
    this.authChange.next(false);
  }

  isAuth() {
    if(localStorage.getItem('token')) {
      if (Number(localStorage.getItem('expires_at')) * 1000 > Date.now()) {
        return true;
      }
    }
    this.logout();
    return false;
  }

  deleteAccount(userId, form) {
    return this.http.delete(
      "http://localhost:3000/api/user/" + userId,
      { headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') }) }
    )
    .map(
      response => {
        return response.json();
      },
      error => console.log(error)
    );
  }
}