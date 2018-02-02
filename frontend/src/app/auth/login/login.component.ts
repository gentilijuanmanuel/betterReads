import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  maxDate; 
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 13);
  }

  login(form: NgForm) {
    this.authService.login(form.value.email, form.value.password)
      .subscribe(
        response => {},

        error => { 
          this.snackBar.open("Los datos ingresados no son validos.", null, { duration: 3500 }
        )},

        () => this.router.navigate(['authors'])
      )
  }

  signup (form: NgForm) {
    console.log(form);
  }
}
