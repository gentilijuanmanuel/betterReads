import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BookService } from '../../book.service';
import { UserService } from '../../user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/switchMap';
import 'rxjs/util/isNumeric';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth.service';
import { AuthorService } from '../../author.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  providers: [ BookService, AuthorService ]
})
export class BookDetailComponent implements OnInit {
  private book: any;
  private bookId: any;
  private authors: any;
  private isAuth: boolean;
  private authSubscription: Subscription;

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private route: ActivatedRoute, 
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(id => {
      this.bookId = id['id'];
      this.bookService.getBookById(id['id']).subscribe(data => this.book = data)
    });

    this.isAuth = this.authService.isAuth();
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });

    this.authorService.getAuthors().subscribe(res => this.authors = res.authors);
  }

  newQuote(id, typeOfQuote) {
    this.router.navigate(['/quote-form', id], { queryParams: { type: typeOfQuote } });
  }

  newReview(id, typeOfReview) {
    this.router.navigate(['/review-form', id], { queryParams: { type: typeOfReview } });
  }

  edit(id) {
    this.router.navigate(['/books', id, 'edit']);
  }

  addToLibrary () {
    this.userService.addBook(this.bookId)
    .subscribe(
      response => { 
        this.snackBar.open("¡Libro agregado con éxito!", null, { duration: 3500 });
      },
      err => {
        this.snackBar.open("Oops. Algo salió mal :(", null, { duration: 3500 });
      }
    )
  }

  addToAuthor (form: NgForm) {
    this.authorService.addBookToLibrary(form.value.author, this.bookId, form.value.collaborator)
      .subscribe(
        response => {
          this.snackBar.open("¡Libro agregado al autor con éxito!", null, { duration: 3500 });
        },
        err => {
          this.snackBar.open("Oops. Algo salió mal :(", null, { duration: 3500 });
        },

        () => {
          this.bookService.getBookById(this.bookId).subscribe(data => this.book = data)
        }
      )
  }

  goLibrary(){
    this.router.navigate(['/library', localStorage.getItem("id")]);
  }

  likeBook(likes: number) {
    likes++;
    console.log(likes);
    this.bookService.likeBook(this.bookId, likes)
    .subscribe(
      response => { 
        this.snackBar.open("¡Gracias! Este libro ahora tiene " + likes + " likes.", null, { duration: 3500 });
        this.route.params.subscribe(id => {
          this.bookId = id['id'];
          this.bookService.getBookById(id['id']).subscribe(data => this.book = data)
        });
      },
      err => {
        this.snackBar.open("Oops. Algo salió mal :(", null, { duration: 3500 });
      }
    )
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
