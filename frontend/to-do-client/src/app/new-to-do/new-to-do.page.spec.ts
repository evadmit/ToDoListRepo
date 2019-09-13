import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewToDoPage } from './new-to-do.page';

describe('NewToDoPage', () => {
  let component: NewToDoPage;
  let fixture: ComponentFixture<NewToDoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewToDoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewToDoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
