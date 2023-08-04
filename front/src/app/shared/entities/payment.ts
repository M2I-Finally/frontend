import { CartLine } from "./cart-line";
import { PaymentDto } from "./payment-dto";

export class Payment {
 
    private basketDetailDto: CartLine[]; // what back needs is productId, quantity, discount
    private total: number;
    private discount: number;
    private paymentDtoList: PaymentDto[]; // amount & payment type [0,1,2]
    private sellerId: number;

  constructor(
    basketDetailDto: CartLine[], 
    total: number, 
    discount: number, 
    paymentDtoList: PaymentDto[], 
    sellerId: number
    ) {
    this.basketDetailDto = basketDetailDto;
    this.total = total;
    this.discount = discount;
    this.paymentDtoList = paymentDtoList;
    this.sellerId = sellerId;
  }

  public getBasketDetailDto(){
    return this.basketDetailDto;
  }

  public setBasketDetailDto(basketDetailDto:CartLine[]){
    this.basketDetailDto = basketDetailDto;
  }
 
  public getTotal(){
    return this.total;
  }

  public setTotal(total: number){
    this.total = total;
  }

  public getDiscount(){
    return this.discount;
  }

  public setDiscount(discount: number){
    this.discount = discount;
  }

  public getPaymentDtoList(){
    return this.paymentDtoList;
  }

  public setPaymentDtoList(paymentDtoList: PaymentDto[]){
    this.paymentDtoList = paymentDtoList;
  }

  public getSellerId(){
    return this.sellerId;
  }

  public setSellerId(sellerId: number){
    this.sellerId = sellerId;
  }
  
}