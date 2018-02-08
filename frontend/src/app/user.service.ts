import { Component, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  addBook (bookId: string) {
    return this.http.post(
      "http://localhost:3000/api/user/" + localStorage.getItem('id') + "/add/" + bookId,
      {},
      { headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') }) }
    )
    .map(
      response => {
        return response.json();
    });
  }

  getLibraryByUserId(id: string) {
    let url = "http://localhost:3000/api/user/library/" + id;

    return this.http.get(
      url,
      { headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') }) }
    ).map((res: Response) => 
      res.json()
    )
  }

  deleteBookFromLibrary(userId: string, bookId: string) {
    let url = "http://localhost:3000/api/user/" + userId + "/remove/" + bookId;
    
    return this.http.post(
      url,
      {},
      { headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') }) }
    )
    .map(
      response => {
        return response.json();
    });
  }
}
