import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';

const routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'authors', component: AuthorsComponent },
  { path: 'books', component: BooksComponent },
  { path: 'welcome', component: LoginComponent },
  { path: 'authors/:id', component: AuthorDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
