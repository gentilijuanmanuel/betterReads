import { Component, OnInit } from '@angular/core';
import { Author } from '../author.model';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthorService } from '../../author.service';
//import { ActivatedRoute } from '@angular/router/src/router_state';
//import { Router } from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css'],
  providers: [AuthorService]
})
export class AuthorListComponent implements OnInit {

  private authors = [];
  selectedAuthor: Author;

  constructor(private service: AuthorService, private route : ActivatedRoute, private router: Router) {

   }

  ngOnInit() {
    this.service.getAuthors().subscribe(data => this.authors = data);
  }

  onSelect(id) {
    this.router.navigate(['/authors', id]);
  }
}
