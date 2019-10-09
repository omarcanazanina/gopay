import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoverdineroPage } from './moverdinero.page';

describe('MoverdineroPage', () => {
  let component: MoverdineroPage;
  let fixture: ComponentFixture<MoverdineroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoverdineroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoverdineroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
