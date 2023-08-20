import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Basket } from 'src/app/shared/entities/basket';
import { PaymentDto } from 'src/app/shared/entities/payment-dto';
import { TodaySaleDto } from 'src/app/shared/entities/today-sale-dto';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BasketService } from 'src/app/shared/services/basket.service';
import { TodaySaleService } from 'src/app/shared/services/today-sale.service';
import jwt_decode from "jwt-decode";
import { Jwt } from 'src/app/shared/entities/jwt';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  providers: [DatePipe]
})
export class LogoutComponent implements OnInit{
  
  currentDate: Date = new Date();
  todaySaleDto$! : TodaySaleDto ;
  paymentCash : number = 0;
  paymentBankCard : number = 0;
  paymentOther : number = 0;
  seller : string = "anonyme";
  total: number = 0;

  constructor(private router: Router,private basketService: BasketService, private authService : AuthService, private todaySaleService : TodaySaleService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.todaySaleService.getTodaySale().subscribe({
      next: (dto : TodaySaleDto) => {
        this.seller =  dto.seller;
        this.total = dto.total;
        this.paymentCash = dto.payments[0].amount;
        this.paymentBankCard = dto.payments[1].amount;
        this.paymentOther = dto.payments[2].amount;
      },
      error: err => {
        const token = sessionStorage.getItem('token');
    
        let jwtDecoded : Jwt = jwt_decode(token!);
        const currentId = jwtDecoded.id;
        this.seller = "vendeur n°"+ currentId;
        this.toastr.info(err.error.message);
      }
    })}
 
  logout():void{
    this.basketService.updateBasket(new Basket([], 0, 1))
    this.authService.logout();
    this.router.navigateByUrl('/')
  }  
  

  goToPage(pageName:string): void {
    this.router.navigate([`${pageName}`])
  }
}