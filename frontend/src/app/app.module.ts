import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { BooksComponent } from './books/books.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth.service';
import { FeedComponent } from './feed/feed.component';
import { QuoteFormComponent } from './quote-form/quote-form.component';
import { ReviewFormComponent } from './review-form/review-form.component';
import { UserService } from './user.service';
import { LibraryComponent } from './library/library.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthorsComponent,
    AuthorListComponent,
    AuthorDetailComponent,
    BooksComponent,
    BookListComponent,
    BookDetailComponent,
    LoginComponent,
    FeedComponent,
    QuoteFormComponent,
    ReviewFormComponent,
    LibraryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
