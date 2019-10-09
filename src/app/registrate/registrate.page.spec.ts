import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistratePage } from './registrate.page';

describe('RegistratePage', () => {
  let component: RegistratePage;
  let fixture: ComponentFixture<RegistratePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistratePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistratePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
