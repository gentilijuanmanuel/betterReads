import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../author.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css'],
  providers: [AuthorService]
})
export class EditAuthorComponent implements OnInit {

  private author: any;
  private maxDate;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.authorService.getAuthorById(params['id']).subscribe(author => {
        this.author = author;
        console.log(this.author);
      })
    }
    );

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear());
  }

  editAuthor(form: NgForm) {
    this.authorService.editAuthor(this.author._id, form.value).subscribe(

      success => {
        this.snackBar.open("Autor editado con exito!", null, { duration: 2500 });
      },

      err => {
        this.snackBar.open("Oops. Algo salio mal :(", null, { duration: 3500 });
      },

      () => this.router.navigate(['authors', this.author._id])
    )
    
  }

}
