import { Component, OnInit } from '@angular/core';
import { Author } from '../authors/author.model';
import { Book } from '../books/book.model';
import { AuthorService } from '../author.service';
import { BookService } from '../book.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/util/isNumeric';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css'],
  providers: [ AuthorService, BookService ]
})

export class QuoteFormComponent implements OnInit {
  private sub: any;
  private type: number;
  private author: Author;
  private book: Book;
  private books: any;
  //private bookId: string;
  //private authorId: string;

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
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
        }
      ));
    }
  }

  onSelect(id) {
    this.router.navigate(['/books', id]);
  }

  postQuote(form: NgForm) {

    if(this.type === 1) {
      this.authorService.postQuote(form.value.id, form.value.user, form.value.quote).subscribe(
        response => {},

        error => { 
          this.snackBar.open("Los datos ingresados no son válidos.", null, { duration: 3500 });
        },

        () => this.router.navigate(['authors'])
      );
    } else if(this.type === 2) {

      console.log(form.value.id);
      console.log(form.value.user);
      console.log(form.value.quote);

      this.bookService.postQuote(form.value.id, form.value.user, form.value.quote).subscribe(
        response => {},

        error => { 
          this.snackBar.open("Los datos ingresados no son válidos.", null, { duration: 3500 });
        },

        () => this.router.navigate(['books'])
      )
    }
  }
}
