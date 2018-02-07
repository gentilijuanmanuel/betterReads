import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  private bookCant;

  constructor() { }

  ngOnInit() {
  }

  cant(childCant) {
    this.bookCant = childCant;
  }

}
