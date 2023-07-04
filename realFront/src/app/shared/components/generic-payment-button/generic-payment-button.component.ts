import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-payment-button',
  templateUrl: './generic-payment-button.component.html',
  styleUrls: ['./generic-payment-button.component.scss']
})
export class GenericPaymentButtonComponent {
  @Input() pathSvg: string | undefined;
  @Input() meansOfPayment: string | undefined;
}
