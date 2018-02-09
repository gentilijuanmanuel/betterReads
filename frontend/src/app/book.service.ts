import { Component, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

  private firstPartUrl = "http://localhost:3000/api/";
  private data: any = {};

  constructor(private http: Http) {

  }

  getData(url) {
    return this.http.get(url)
                    .map((res: Response) => res.json())
  }

  getBooks() {
    let url = this.firstPartUrl + "book";
    return this.getData(url);
  }

  getBookById(id: string) {
    let url = this.firstPartUrl + "book/" + id;
    return this.getData(url);
  }

  getBooksByGenre(genre: string) {
    let url = this.firstPartUrl + "book/genre/" + genre;
    return this.getData(url);
  }

  getBooksByAuthor(name: string, surname: string) {
    let url = this.firstPartUrl + "book/author/" + name + "/" + surname;
    return this.getData(url);
  }

  postQuote(bookId: any, user: string, quote: string){
    let url = this.firstPartUrl + "book/quote/" + bookId;
    
    return this.http.post(
      url,
      { quote: quote, user: user },
      { headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') }) }
    )
    .map(
      response => {
        return response.json();
      })
  }

  postReview(bookId: any, user: string, comment: string, stars: number){
    let url = this.firstPartUrl + "book/review/" + bookId;
     
    return this.http.post(
      url,
      { user: user, comment: comment, stars: stars },
      { headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') }) }
    )
    .map(
      response => {
        return response.json();
      })
  }

  likeBook(bookId: string, likes: number) {
    let url = this.firstPartUrl + "book/like/" + bookId;

    return this.http.patch(
      url,
      { likes: likes },
      { headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') }) }
    )
    .map(
      response => {
        return response.json();
      })
  }
}
