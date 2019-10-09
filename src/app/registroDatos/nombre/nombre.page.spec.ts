import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NombrePage } from './nombre.page';

describe('NombrePage', () => {
  let component: NombrePage;
  let fixture: ComponentFixture<NombrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NombrePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NombrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
