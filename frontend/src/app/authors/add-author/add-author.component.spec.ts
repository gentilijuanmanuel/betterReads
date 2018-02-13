import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuthorComponent } from './add-author.component';

describe('AddAuthorComponent', () => {
  let component: AddAuthorComponent;
  let fixture: ComponentFixture<AddAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
