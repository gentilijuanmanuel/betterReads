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
}
