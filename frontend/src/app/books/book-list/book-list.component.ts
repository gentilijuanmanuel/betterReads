import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { BookService } from '../../book.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [BookService]
})
export class BookListComponent implements OnInit {

  private books = [];
  selectedBook: Book;

  constructor(private service: BookService, private route : ActivatedRoute, private router: Router) {

   }

  ngOnInit() {
    this.service.getBooks().subscribe(data => this.books = data);
  }

  onSelect(id) {
    this.router.navigate(['/books', id]);
  }
}
