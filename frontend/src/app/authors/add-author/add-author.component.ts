import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../author.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FileSelectDirective, FileUploader, FileUploaderOptions } from 'ng2-file-upload';

const uri = 'http://localhost:3000/api/author/upload';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css'],
  providers: [AuthorService]
})
export class AddAuthorComponent implements OnInit {
  private maxDate;

  uploader: FileUploader = new FileUploader({ url: uri });

  private fileName: string;

  attachmentList: any = [];

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        this.attachmentList.push(JSON.parse(response));
    }
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear());

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

  addAuthor(form: NgForm) {
    this.authorService.addAuthor(
      form.value.name,
      form.value.surname,
      form.value.dateOfBirth,
      form.value.dateOfDeath,
      form.value.gender,
      form.value.nationality,
      form.value.language,
      form.value.ocupation,
      this.fileName
    ).subscribe(

      success => {
        this.snackBar.open("Autor agregado con éxito!", null, { duration: 2500 });
      },

      err => {
        this.snackBar.open("Oops. Algo salió mal :(", null, { duration: 3500 });
      },

      () => this.router.navigate(['authors'])
    );
  }

}
