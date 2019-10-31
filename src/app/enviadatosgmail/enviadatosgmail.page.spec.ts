import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviadatosgmailPage } from './enviadatosgmail.page';

describe('EnviadatosgmailPage', () => {
  let component: EnviadatosgmailPage;
  let fixture: ComponentFixture<EnviadatosgmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviadatosgmailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviadatosgmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
