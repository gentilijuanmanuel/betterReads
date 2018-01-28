import { Component, OnInit } from '@angular/core';
import { Author } from '../author.model';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthorService } from '../../author.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css'],
  providers: [AuthorService]
})
export class AuthorListComponent implements OnInit {

  private authors = [];
  selectedAuthor: Author;

  constructor(private service: AuthorService) {

   }

  ngOnInit() {
    this.service.getAuthors().subscribe(data => this.authors = data);
  }

  onSelect(author: Author): void {
    this.selectedAuthor = author;
  }
}
