import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BookService } from '../../book.service';
import { UserService } from '../../user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/switchMap';
import 'rxjs/util/isNumeric';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  providers: [ BookService ]
})
export class BookDetailComponent implements OnInit {
  private book: any;
  private bookId: any;
  private isAuth: boolean;
  private authSubscription: Subscription;

  constructor(
    private service: BookService, 
    private route: ActivatedRoute, 
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(id => {
      this.bookId = id['id'];
      this.service.getBookById(id['id']).subscribe(data => this.book = data)
    });

    this.isAuth = this.authService.isAuth();
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    })
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
        let action = "VER BIBLIOTECA";
        this.snackBar.open("¡Libro agregado con éxito!", action, { duration: 3500 });
      },
      err => {
        this.snackBar.open("Oops. Algo salió mal :(", null, { duration: 3500 });
      }
    )
  }

  goLibrary(){
    this.router.navigate(['/library', localStorage.getItem("id")]);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
