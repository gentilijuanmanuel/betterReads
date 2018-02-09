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

const routes = [
  { path: '', component: FeedComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'books', component: BooksComponent },
  { path: 'login', component: LoginComponent },
  { path: 'authors/:id', component: AuthorDetailComponent },
  { path: 'books/:id', component: BookDetailComponent },
  { path: 'books/:id/edit', component: EditBookComponent, canActivate: [AuthGuard] },
  { path: 'quote-form/:id', component: QuoteFormComponent, canActivate: [AuthGuard] },
  { path: 'review-form/:id', component: ReviewFormComponent, canActivate: [AuthGuard] },
  { path: 'library/:id', component: LibraryComponent, canActivate: [AuthGuard] }

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
