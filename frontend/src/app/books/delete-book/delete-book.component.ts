import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../../book.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/util/isNumeric';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css'],
  providers: [ BookService ]
})
export class DeleteBookComponent implements OnInit {
  private book: Book;
  private bookId: any;

  constructor(
    private bookService: BookService, 
    private route: ActivatedRoute, 
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.params.subscribe(id => {
      this.bookId = id['id'];
      this.bookService.getBookById(id['id']).subscribe(data => this.book = data)
    });
  }

  cancel(id: string) {
    this.router.navigate(['/books', id]);
  }

  deleteBook(form: NgForm) {
    this.bookService.deleteBook(this.bookId, form.value.name, form.value.surname).subscribe(

      success => {
        this.snackBar.open("Libro eliminado con éxito!", null, { duration: 2500 });
      },

      err => {
        this.snackBar.open("Oops. Algo salió mal :(", null, { duration: 3500 });
      },

      () => this.router.navigate(['books'])
    )
  }

}
