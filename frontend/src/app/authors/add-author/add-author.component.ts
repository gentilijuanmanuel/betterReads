import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../author.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css'],
  providers: [AuthorService]
})
export class AddAuthorComponent implements OnInit {
  private maxDate;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear());
  }

  addAuthor(form: NgForm) {
    this.authorService.addAuthor(
      form.value.name,
      form.value.surname,
      form.value.dateOfBirth,
      form.value.dateOfDeath,
      form.value.gender,
      form.value.nationality,
      form.value.language,
      form.value.ocupation
    ).subscribe(
      response => {},

      error => { 
        this.snackBar.open("Oops. Algo salio mal :(", null, { duration: 3500 });
      },

      () => this.snackBar.open("Autor agregado con éxito.", null, { duration: 3500 })
    );
  }

}
