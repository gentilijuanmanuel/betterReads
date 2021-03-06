import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  userName: String;
  authSubscription: Subscription;
  userId: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isAuth = this.authService.isAuth();
    this.userName = localStorage.getItem('name');
    this.userId = localStorage.getItem('id');

    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
      this.userName = localStorage.getItem('name');
      this.userId = localStorage.getItem('id');
    })
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  logout () {
    this.authService.logout();
    this.userName = null;
    this.userId = null;
    this.router.navigate(['login']);
  }
}
