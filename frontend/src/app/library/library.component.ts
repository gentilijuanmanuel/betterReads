import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Book } from '../books/book.model';
import { MatSnackBar } from '@angular/material';
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
    private snackBar: MatSnackBar,
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

  deleteBookFromLibrary(idBook: string){
    this.service.deleteBookFromLibrary(this.userId, idBook)
                .subscribe(
                  response => { 
                    this.snackBar.open("¡Libro eliminado con éxito!", null, { duration: 3500 });
                    
                    this.route.params.subscribe(id => {
                      this.userId = id['id'];
                      this.service.getLibraryByUserId(this.userId).subscribe(data => this.user = data)
                    });
                  },
                  err => {
                   this.snackBar.open("Oops. Algo salió mal :(", null, { duration: 3500 });
                  }
                )
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
