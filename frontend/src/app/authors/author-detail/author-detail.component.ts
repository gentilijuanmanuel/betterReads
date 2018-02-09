import { Component, OnInit, Input } from '@angular/core';
import { Author } from '../author.model';
import { AuthorService } from '../../author.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/util/isNumeric';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css'],
  providers: [ AuthorService ]
})
export class AuthorDetailComponent implements OnInit {
  private author: any;

  constructor(private service: AuthorService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(id =>
      this.service.getAuthorById(id['id']).subscribe(data => this.author = data) );
  }

  onSelect(id) {
    this.router.navigate(['/books', id]);
  }

  //typeOfQuote = 1 if it's an author quote.
  newQuote(id, typeOfQuote) {
    this.router.navigate(['/quote-form', id], { queryParams: { type: typeOfQuote } });
  }

  //typeOfReview = 1 if it's an author review.
  newReview(id, typeOfReview) {
    this.router.navigate(['/review-form', id], { queryParams: { type: typeOfReview } });
  }

  edit(id) {
    this.router.navigate(['/authors', id, 'edit'])
  }
}
