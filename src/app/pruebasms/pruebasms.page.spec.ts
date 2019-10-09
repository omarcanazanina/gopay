import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebasmsPage } from './pruebasms.page';

describe('PruebasmsPage', () => {
  let component: PruebasmsPage;
  let fixture: ComponentFixture<PruebasmsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebasmsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebasmsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
