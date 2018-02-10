import { Component, OnInit } from '@angular/core';
import { Author } from '../authors/author.model';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthorService } from '../author.service';
import { BookService } from '../book.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  providers: [AuthorService, BookService]
})
export class FeedComponent implements OnInit {
  
  private popularAuthors = [];
  private popularBooks = [];

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private route : ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.authorService.getPopularAuthors().subscribe(data => { 
      this.popularAuthors = data.authors;
    });

    this.bookService.getPopularBooks().subscribe(data => { 
      this.popularBooks = data.books;
    });
  }

  onSelectAuthor(id) {
    this.router.navigate(['/authors', id]);
  }

  onSelectBook(id) {
    this.router.navigate(['/books', id]);
  }

}
