import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { AuthGuard } from './auth.guard';

const routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'authors', component: AuthorsComponent },
  { path: 'books', component: BooksComponent },
  { path: 'welcome', component: LoginComponent },
  { path: 'authors/:id', component: AuthorDetailComponent },
  { path: 'books/:id', component: BookDetailComponent }

  /*
  EXAMPLE OF PROTECTED ROUTE

  { path: 'books/:id', component: BookDetailComponent, canActivate: [AuthGuard] }

  */
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ AuthGuard ]
})
export class AppRoutingModule { }
