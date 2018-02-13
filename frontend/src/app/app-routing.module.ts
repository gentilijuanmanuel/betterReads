import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { AuthGuard } from './auth.guard';
import { FeedComponent } from './feed/feed.component';
import { QuoteFormComponent } from './quote-form/quote-form.component';
import { ReviewFormComponent } from './review-form/review-form.component';
import { LibraryComponent } from './library/library.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { EditAuthorComponent } from './authors/edit-author/edit-author.component';
import { AccountManagementComponent } from './auth/account-management/account-management.component';
import { NotfoundComponent } from './auth/notfound/notfound.component';
import { AddAuthorComponent } from './authors/add-author/add-author.component';
import { AddBookComponent } from './books/add-book/add-book.component';

const routes = [
  { path: '', component: FeedComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: '404', component: NotfoundComponent },
  { path: 'books', component: BooksComponent },
  { path: 'login', component: LoginComponent },
  { path: 'manage-account', component: AccountManagementComponent, canActivate: [AuthGuard] },
  { path: 'authors/:id', component: AuthorDetailComponent },
  { path: 'authors/:id/edit', component: EditAuthorComponent, canActivate: [AuthGuard] },
  { path: 'books/:id', component: BookDetailComponent },
  { path: 'books/:id/edit', component: EditBookComponent, canActivate: [AuthGuard] },
  { path: 'quote-form/:id', component: QuoteFormComponent, canActivate: [AuthGuard] },
  { path: 'review-form/:id', component: ReviewFormComponent, canActivate: [AuthGuard] },
  { path: 'my-library', component: LibraryComponent, canActivate: [AuthGuard] },
  { path: 'add-authors', component: AddAuthorComponent, canActivate: [AuthGuard] },
  { path: 'add-books', component: AddBookComponent, canActivate: [AuthGuard] },


  { path: '**', redirectTo: '404' }

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
