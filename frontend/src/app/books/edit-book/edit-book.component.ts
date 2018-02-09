import { Component, OnInit } from '@angular/core';
import { BookService } from '../../book.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
  providers: [BookService]
})
export class EditBookComponent implements OnInit {

  private book: any;

  genres = [
    { value: 'Novela'},
    { value: 'Poesía'},
    { value: 'Ensayo'},
    { value: 'No ficción' },
    { value: 'Terror' },
    { value: 'Filosofía' },
    { value: 'Policial' },
    { value: 'Fantástico' },
    { value: 'Biografía' },
    { value: 'Autobiografía' },
    { value: 'Diario de viajes' },

  ];

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.bookService.getBookById(params['id']).subscribe(book => {
        this.book = book;
      })}
    );
  }

  editBook(form: NgForm) {
    this.bookService.editBook(this.book._id, form.value).subscribe(

      success => {
        this.snackBar.open("Libro editado con exito!", null, { duration: 2500 });
      },

      err => {
        this.snackBar.open("Oops. Algo salio mal :(", null, { duration: 3500 });
      },

      () => this.router.navigate(['books', this.book._id])
    )
  }
}
