import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericPaymentButtonComponent } from './generic-payment-button.component';

describe('GenericPaymentButtonComponent', () => {
  let component: GenericPaymentButtonComponent;
  let fixture: ComponentFixture<GenericPaymentButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericPaymentButtonComponent]
    });
    fixture = TestBed.createComponent(GenericPaymentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
