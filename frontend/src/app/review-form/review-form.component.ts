import { Component, OnInit } from '@angular/core';
import { Author } from '../authors/author.model';
import { Book } from '../books/book.model';
import { AuthorService } from '../author.service';
import { BookService } from '../book.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/util/isNumeric';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css'],
  providers: [ AuthorService, BookService ]
})

export class ReviewFormComponent implements OnInit {
  private sub: any;
  private type: number;
  private author: any;
  private book: any;
  private books: any;

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.type = + params['type'] || 0;
      });

      if(this.type === 1) {
        this.route.params.subscribe(id =>
          this.authorService.getAuthorById(id['id']).subscribe(data => {
            this.author = data,
            this.bookService.getBooksByAuthor(this.author.name, this.author.surname).subscribe(data => this.books = data);
          }
        ));
  
      } else if(this.type === 2) {
        this.route.params.subscribe(id =>
          this.bookService.getBookById(id['id']).subscribe(data => {
            this.book = data,
            this.bookService.getBooksByGenre(this.book.genre).subscribe(data => this.books = data);
          }));
      }
  }

  onSelect(id) {
    this.router.navigate(['/books', id]);
  }
}