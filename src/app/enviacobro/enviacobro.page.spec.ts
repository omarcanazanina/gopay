import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviacobroPage } from './enviacobro.page';

describe('EnviacobroPage', () => {
  let component: EnviacobroPage;
  let fixture: ComponentFixture<EnviacobroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviacobroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviacobroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
