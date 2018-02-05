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

  getAuthorById(id: string) {
    let url = this.firstPartUrl + "author/" + id;
    return this.getData(url);
  }

  postQuote(authorId: any, user: string, quote: string){
    let url = this.firstPartUrl + "author/" + authorId + "/quote";
    
    return this.http.post(
      url,
      { quote: quote, user: user }
    )
    .map(
      response => {
        return response.json();
      })
  }
}
