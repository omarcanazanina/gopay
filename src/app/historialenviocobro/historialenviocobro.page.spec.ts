import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialenviocobroPage } from './historialenviocobro.page';

describe('HistorialenviocobroPage', () => {
  let component: HistorialenviocobroPage;
  let fixture: ComponentFixture<HistorialenviocobroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialenviocobroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialenviocobroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
