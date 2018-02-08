import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Book } from '../books/book.model';

//ver
import 'rxjs/add/operator/switchMap';
import 'rxjs/util/isNumeric';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  private userId: any;
  private user: any;
  private isAuth: boolean;
  private authSubscription: Subscription;

  constructor(
    private service: UserService, 
    private route: ActivatedRoute, 
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(id => {
      this.userId = id['id'];
      this.service.getLibraryByUserId(this.userId).subscribe(data => this.user = data)
    });

    this.isAuth = this.authService.isAuth();
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    })
  }

  onSelect(id: string) {
    this.router.navigate(['/books', id]);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
