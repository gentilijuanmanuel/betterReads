import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  private authcant;
  
  constructor() { }

  ngOnInit() {
  }

  cant(childCant) {
    this.authcant = childCant;
  }

}
