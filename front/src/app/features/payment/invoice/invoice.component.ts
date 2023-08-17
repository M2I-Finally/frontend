import { Component, OnDestroy, OnInit } from '@angular/core';
import { Basket } from 'src/app/shared/entities/basket';
import { BasketLine } from 'src/app/shared/entities/basket-line';
import { Jwt } from 'src/app/shared/entities/jwt';
import { PaymentDto } from 'src/app/shared/entities/payment-dto';
import { BasketService } from 'src/app/shared/services/basket.service';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';


@Component({
  selector: 'facture',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit,OnDestroy {

  
  paidBasket: Basket = new Basket([],0,1); 
  currentDate: Date = new Date(); 
  tva:number = 5.5;
  idBasket: number = 0;
  basketLines: BasketLine[]=[];
  paymentsDtoList: PaymentDto[]=[];
  items: number = 0;
  sellerId: number=0;
  basket$!: Basket;
  discount:number = 1;
  oldTotal:number =0;
  customerEmail:string = "";

  constructor(private basketService: BasketService,private router: Router,private toastr: ToastrService){}
  ngOnDestroy(): void {
    this.basketService.clearPaidBasket();    
  }

  formSendEmail = new UntypedFormGroup({
    inputEmail:new UntypedFormControl('', [])    
  });

  ngOnInit(): void {
    this.basketService.basket$.subscribe((basket: Basket) => {
      this.basket$ = basket      
      ;})    
    this.injectValues();
  }

  close(){
    this.router.navigateByUrl('/shop');
  }
  notify(action:string, param:string = ""){
    if(action.localeCompare('email')==0){
      if(this.customerEmail.length > 0){
        this.toastr.success('email envoyé à ' + this.customerEmail);
      }else{
        this.toastr.info('le champ email est vide')
      }
      
    }
    if(action.localeCompare('print')==0){
      this.toastr.success('impression en cours sur imprimante 001')
    }
  }

  updateEmail(formGroupName:UntypedFormGroup, name:string,){
    this.customerEmail = formGroupName.controls[name].value;
    this.notify('email',this.customerEmail);
  }
  
  injectValues(){   
    
    const token = sessionStorage.getItem('token');    
    let jwtDecoced : Jwt = jwt_decode(token!);
    this.sellerId = jwtDecoced.id
    this.paidBasket = this.basketService.paidBasket;
    this.idBasket =   this.basketService.idPaidBasket; 
    this.basketLines = this.paidBasket.getBasketLines();
    this.paymentsDtoList = this.basketService.paymentsDtoList;
    for(let basketline of this.basketLines){
      this.items += basketline.getQuantity();
    }
    if(this.basket$.getDiscount() != 1){      
      this.discount = this.basket$.getDiscount() * 100 ;
      this.oldTotal = this.paidBasket.getTotal() * (100 / (100-this.discount));      
    }
    
    
  }
}
