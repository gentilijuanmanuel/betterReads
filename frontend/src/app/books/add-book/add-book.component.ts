import { Component, OnInit } from '@angular/core';
import { BookService } from '../../book.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FileSelectDirective, FileUploader, FileUploaderOptions } from 'ng2-file-upload';

const uri = 'http://localhost:3000/api/book/upload';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  providers: [ BookService ]
})
export class AddBookComponent implements OnInit {

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

  uploader: FileUploader = new FileUploader({ url: uri });

  private fileName: string;

  attachmentList: any = [];

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        this.attachmentList.push(JSON.parse(response));
    } 
  }

  ngOnInit() {

    var options: FileUploaderOptions = {};
    let token = localStorage.getItem("token");
    options.headers = [{ name: 'x-access-token', value : token }];
    this.uploader.setOptions(options);
    this.uploader.options.headers['x-access-token'] =

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded", item, status, response);
      this.fileName = "uploads/" + this.uploader.queue[0].file.name;
      this.snackBar.open("Foto subida con éxito.", null, { duration: 3500 });
    }
  }

  addBook(form: NgForm) {
    this.bookService.addBook(
      form.value.isbn,
      form.value.title,
      form.value.name,
      form.value.surname,
      form.value.description,
      form.value.genre,
      this.fileName
    ).subscribe(
      
      success => {
        this.snackBar.open("Libro agregado con éxito!", null, { duration: 2500 });
      },

      err => {
        this.snackBar.open("Oops. Algo salió mal :(", null, { duration: 3500 });
      },

      () => this.router.navigate(['books'])
    );
  }

}




