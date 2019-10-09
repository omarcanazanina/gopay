import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevatarjetaPage } from './nuevatarjeta.page';

describe('NuevatarjetaPage', () => {
  let component: NuevatarjetaPage;
  let fixture: ComponentFixture<NuevatarjetaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevatarjetaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevatarjetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
