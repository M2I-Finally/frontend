import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentConfirmationPageComponent } from './payment-confirmation-page.component';

describe('PaymentConfirmationPageComponent', () => {
  let component: PaymentConfirmationPageComponent;
  let fixture: ComponentFixture<PaymentConfirmationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentConfirmationPageComponent]
    });
    fixture = TestBed.createComponent(PaymentConfirmationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
