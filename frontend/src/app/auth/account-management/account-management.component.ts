import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  deleteAccount(form: NgForm) {
    this.authService.deleteAccount(form.value)
    .subscribe(
      success => {
        this.snackBar.open("Sentimos verte partir :( Hasta la vuelta!", null, { duration: 3500 });
        this.authService.logout();
      },
      err => {
        this.snackBar.open("La contraseña ingresada no es valida", null, { duration: 3500 });
      },
      () => {
        this.router.navigate(['login'])
      }
    );
  }

  changePassword(form: NgForm) {
    this.authService.changePassword(form.value)
    .subscribe(
      success => {
        this.snackBar.open("Contraseña cambiada satisfactoriamente!", null, { duration: 3500 });
      },
      err => {
        this.snackBar.open("La contraseña ingresada no es valida", null, { duration: 3500 });
      }
    );
  }
}
