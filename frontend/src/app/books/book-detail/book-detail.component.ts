import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../../book.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/util/isNumeric';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  providers: [ BookService ]
})
export class BookDetailComponent implements OnInit {
  private book: any;

  constructor(private service: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(id =>
      this.service.getBookById(id['id']).subscribe(data => this.book = data) );
  }

  //typeOfQuote = 2 if it's an book quote.
  newQuote(id, typeOfQuote) {
    this.router.navigate(['/quote-form', id], { queryParams: { type: typeOfQuote } });
  }

  //typeOfReview = 2 if it's an book review.
  newReview(id, typeOfReview) {
    this.router.navigate(['/review-form', id], { queryParams: { type: typeOfReview } });
  }
}
