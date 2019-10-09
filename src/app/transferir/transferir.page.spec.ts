import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferirPage } from './transferir.page';

describe('TransferirPage', () => {
  let component: TransferirPage;
  let fixture: ComponentFixture<TransferirPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferirPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
