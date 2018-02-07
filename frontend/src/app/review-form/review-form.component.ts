import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';
import { BookService } from '../book.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/util/isNumeric';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css'],
  providers: [ AuthorService, BookService ]
})

export class ReviewFormComponent implements OnInit {
  private sub: any;
  private type: any;
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

  postReview(form: NgForm) {

    if(this.type == 'author') {

      this.authorService.postReview(this.author._id, this.currentUser, form.value.comment, form.value.stars).subscribe(
        response => {},

        error => { 
          this.snackBar.open("Oops. Algo salio mal :(", null, { duration: 3500 });
        },

        () => this.router.navigate(['authors', this.author._id])
      );
    } else if(this.type == 'book') {

      this.bookService.postReview(this.book._id, this.currentUser, form.value.comment, form.value.stars).subscribe(
        response => {},

        error => { 
          this.snackBar.open("Oops. Algo salio mal :(", null, { duration: 3500 });
        },

        () => this.router.navigate(['/books', this.book._id])
      )
    }
  }
}