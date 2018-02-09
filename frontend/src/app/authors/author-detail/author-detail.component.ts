import { Component, OnInit, Input } from '@angular/core';
import { Author } from '../author.model';
import { AuthorService } from '../../author.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/util/isNumeric';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css'],
  providers: [ AuthorService ]
})
export class AuthorDetailComponent implements OnInit {
  private author: any;

  constructor(
    private authorService: AuthorService, 
    private route: ActivatedRoute, 
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.params.subscribe(id =>
      this.authorService.getAuthorById(id['id']).subscribe(data => this.author = data) );
  }

  onSelect(id) {
    this.router.navigate(['/books', id]);
  }

  newQuote(id, typeOfQuote) {
    this.router.navigate(['/quote-form', id], { queryParams: { type: typeOfQuote } });
  }

  newReview(id, typeOfReview) {
    this.router.navigate(['/review-form', id], { queryParams: { type: typeOfReview } });
  }

  edit(id) {
    this.router.navigate(['/authors', id, 'edit'])
  }

  deleteBookFromAuthor(bookId) {
    this.authorService.deleteBookFromLibrary(this.author._id, bookId)
    .subscribe(
      success => {
        this.snackBar.open("¡Libro eliminado con éxito!", null, { duration: 3500 });
      },

      err => {
        this.snackBar.open("Oops. Algo salió mal :(", null, { duration: 3500 });
      },

    () => {
      this.authorService.getAuthorById(this.author._id).
      subscribe(
        data => this.author = data
      )
    }
    )
  }
}
