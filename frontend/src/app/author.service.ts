import { Component, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthorService {

  private firstPartUrl = "http://localhost:3000/api/";
  private data: any = {};


  constructor(private http: Http) {

  }

  getData(url) {
    return this.http.get(url)
                    .map((res: Response) => res.json())
  }

  getAuthors() {
    let url = this.firstPartUrl + "author";
    return this.getData(url);
  }
}
