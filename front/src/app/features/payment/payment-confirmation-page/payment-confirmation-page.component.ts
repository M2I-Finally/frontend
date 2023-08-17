import { Component, OnInit } from '@angular/core';

import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Basket } from 'src/app/shared/entities/basket';
import { BasketService } from 'src/app/shared/services/basket.service';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { Payment } from 'src/app/shared/entities/payment';
import { BasketLine } from 'src/app/shared/entities/basket-line';
import { PaymentDto } from 'src/app/shared/entities/payment-dto';
import { ToastrService } from 'ngx-toastr';
import { Jwt } from 'src/app/shared/entities/jwt';
import jwt_decode from "jwt-decode";
import { _isNumberValue } from '@angular/cdk/coercion';

@Component({
  selector: 'app-payment-confirmation-page',
  templateUrl: './payment-confirmation-page.component.html',
  styleUrls: ['./payment-confirmation-page.component.scss']
})

export class PaymentConfirmationPageComponent implements OnInit {
  total!: number
  totalAfterDiscount: number | undefined;
  basketModified: boolean | undefined;
  basket$!: Basket;
  basketLine!: BasketLine[];
  amount: number = 0;
  amountDue: number = 0;
  amountPaid: number = 0;
  change: number = 0;
  paymentTypeId: number | undefined;
  payment$!: Payment;
  sellerId: number = 999;
  discount: number = 1;
  paymentDtoList: PaymentDto[] = [];
  idPaidBasket: number = 0;

  constructor(private basketService: BasketService, private paymentService: PaymentService, private toastr: ToastrService, private router: Router) { };

  formPayByCard = new UntypedFormGroup({
    sumCard: new UntypedFormControl(''),
    BANK_CAR: new UntypedFormControl(1)
  });

  formPayByCash = new UntypedFormGroup({
    sumCash: new UntypedFormControl(''),
    CASH: new UntypedFormControl(0)
  });

  formPayByOther = new UntypedFormGroup({
    sumOther: new UntypedFormControl(''),
    OTHER: new UntypedFormControl(2)
  });

  ngOnInit(): void {
    /**
     * get basket from service
     */
    this.basketService.basket$.subscribe((basket: Basket) => {
      this.basket$ = basket;
      this.total = this.basket$.getTotal();
      this.basketLine = basket.getBasketLines();
    })

    /**
     * initialize amountDue
     */
    this.amountDue = this.total;

    /**
     * get seller id
     */
    let sessionToken = sessionStorage.getItem('token');
    let decoded: Jwt = jwt_decode(sessionToken!);
    this.sellerId = decoded.id;

  };

  /**
   * update total if there is any discount change
   * @param event totalAfterDiscount from recap-list
   */
  totalWithDiscount(event: number) {
    this.totalAfterDiscount = event;
    
    // if totalAfterDiscount is smaller than total, means we have applied a discount and the total should be updated. 
    if (this.totalAfterDiscount < this.total) {
      this.discount = 1 - this.totalAfterDiscount / this.total;
      this.isBasketLineModified(true);
    }
    
    this.amountDue = this.totalAfterDiscount;
    return this.basket$.setTotal(this.totalAfterDiscount);
  };

  /**
   * Partial payment
   * In case of payment in cash and there is change, the change will be discounted before post to back
   * In case of payment by others(chèque de restaurent or des vacances), there would be no change applied.
   * @param formGroupName get payment amount from input
   * @param name FormControlName for input
   * @param paymentType 0 = cash, 1 = bank card, 2 = other
   */
  updatePayment(formGroupName: UntypedFormGroup, name: string, paymentType: string) {
    // get the payment input
    this.amount = formGroupName.controls[name].value;

    // get payment id
    this.paymentTypeId = parseInt(formGroupName.controls[paymentType].value);

    // update total
    if (this.total > 0) {
      this.amountPaid += this.amount;
      if (this.amountPaid < this.total) {
        this.amountDue = this.total - this.amountPaid;
      } else {
        this.amountDue = 0;
        // no changes need when payment on chèque de vanceces or chèque de restaurant
        if (this.paymentTypeId === 2) {
          this.change = 0;
        } else {
          this.change = this.amountPaid - this.total;
        }
      }

    } else {
      this.toastr.error("Il n'y a rien à payer.")
    }

    // note partial payment amount and id, if there is change, we need to note (cash received - change) to bdd
    if (this.paymentTypeId === 0 && this.change) {
      this.paymentDtoList.push(new PaymentDto((this.amount - this.change), this.paymentTypeId));
    } else {
      this.paymentDtoList.push(new PaymentDto(this.amount, this.paymentTypeId));
    }

  }

  /**
    * total payment
    * @param paymentTypeId 0 = cash, 1 = bank card, 2 = other
    */
  Submit(paymentTypeId: number) {
    this.paymentDtoList.push(new PaymentDto(this.amountDue, paymentTypeId));
    this.amountDue = 0;
    this.createBasket();
  }

  /**
  * Any modification for quantity will update payment situation.
  * @param event if quantity is changed. 
  */
  isBasketLineModified(event: boolean) {
    this.basketModified = event;

    if (this.basketModified) {
      this.amountDue = this.total - this.amountPaid;

      if (this.amountDue >= 0) {
        this.change = 0;
      }

      if (this.amountDue < 0) {
        this.change = this.amountPaid - this.total
        this.amountDue = 0
      }
    }
  }

  /**
   * cancel payment
   * reset the basket and noted payment list
   * @param page back to shop
   */
  protected cancelBasket(page: string): void {
    this.basket$.resetBasket();
    this.clearPaymentList();
    this.router.navigate([page]);
  }

  /**
   * valid payment, get success or fail message
   * payment will not pass when there is nothing in the basket nor the basket is been paid.
   */
  protected createBasket(): void {
    // basket cannot be empty
    if (this.total > 0) {

      //payment needs to be done
      if (this.amountDue > 0) {
        this.toastr.error("Veuillez finir le paiement.");
      } else {
        this.paymentService.postPayment(
          new Payment(this.basketLine,
            this.total,
            this.discount,
            this.paymentDtoList,
            this.sellerId)
        ).subscribe({
          next: (data) => {
            this.toastr.success(`Le panier ${data} est bien enregistré, la facture est encours de généreration.`);
            //sauvegarde du panier payer dans le basket service pour edition de la facture
            let paidBasket = new Basket(this.basket$.getBasketLines(), this.basket$.getTotal(), this.discount)
            this.idPaidBasket = data;
            this.basketService.SavePaidBasket(paidBasket, data, this.paymentDtoList);
            // une fois payé, vider le panier et avancer sur la page facture 
            this.cancelBasket('facture');
          },
          error: error => this.toastr.error(error.message)
        });
      }

    } else {
      this.toastr.error("Le panier n'est pas encore crée.");
      this.cancelBasket('shop');
    }
  }

  /**
   * clear noted payment amount and id in paymentList
   */
  private clearPaymentList() {
    if (this.paymentDtoList.length > 0) {
      for (let i = 0; i < this.paymentDtoList.length; i++) {
        this.paymentDtoList.pop();
      }
    };
  }
}


