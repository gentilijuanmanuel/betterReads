import { Component, OnInit } from '@angular/core';
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
  private type: string;
  private author: any;
  private book: any;
  private books: any;
  private currentUser: string;

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.currentUser = localStorage.getItem('name') + ' ' + localStorage.getItem('surname');
    
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.type = params.type;
        if (params.type == 'author') {
          this.route.params.subscribe(id =>
            this.authorService.getAuthorById(id['id']).subscribe(author => {
              this.author = author;
              this.books = this.author.books;
            }
            )
          );
        }

        else if (params.type == 'book') {
        this.route.params.subscribe(id =>
          this.bookService.getBookById(id['id']).subscribe(book => {
            this.book = book;

            this.bookService.getBooksByGenre(this.book.genre).subscribe(books => this.books = books);
          }
          )
        );
      }
      }
      );
  }

  onSelect(id) {
    this.router.navigate(['/books', id]);
  }

  postQuote(form: NgForm) {

    if(this.type == 'author') {
      this.authorService.postQuote(this.author._id, this.currentUser, form.value.quote).subscribe(
        response => {},

        error => { 
          this.snackBar.open("Los datos ingresados no son válidos.", null, { duration: 3500 });
        },

        () => this.router.navigate(['authors'])
      );

    } else if(this.type == 'book') {

      this.bookService.postQuote(this.book._id, this.currentUser, form.value.quote).subscribe(
        response => {},

        error => { 
          this.snackBar.open("Los datos ingresados no son válidos.", null, { duration: 3500 });
        },

        () => this.router.navigate(['books'])
      )
    }
  }
}
