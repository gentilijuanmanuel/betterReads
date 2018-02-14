import { Component, OnInit } from '@angular/core';
import { Author } from '../author.model';
import { AuthorService } from '../../author.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/util/isNumeric';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-delete-author',
  templateUrl: './delete-author.component.html',
  styleUrls: ['./delete-author.component.css'],
  providers: [ AuthorService ]
})
export class DeleteAuthorComponent implements OnInit {
  private author: Author;
  private authorId: any;

  constructor(
    private authorService: AuthorService, 
    private route: ActivatedRoute, 
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.params.subscribe(id => {
      this.authorId = id['id'];
      this.authorService.getAuthorById(id['id']).subscribe(data => this.author = data)
    });
  }

  cancel(id: string) {
    this.router.navigate(['/authors', id]);
  }

  deleteAuthor(form: NgForm) {
    this.authorService.deleteAuthor(this.authorId).subscribe(

      success => {
        this.snackBar.open("Autor eliminado con éxito!", null, { duration: 2500 });
      },

      err => {
        this.snackBar.open("Oops. Algo salió mal :(", null, { duration: 3500 });
      },

      () => this.router.navigate(['authors'])
    )
  }

}
