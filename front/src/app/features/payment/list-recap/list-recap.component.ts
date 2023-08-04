import { Component, OnInit, Input, EventEmitter,Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { BasketService } from 'src/app/shared/services/basket.service';
import { Product } from 'src/app/shared/entities/product';
import { Cart } from 'src/app/shared/entities/cart';
import { CartLine } from 'src/app/shared/entities/cart-line';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'list-recap',
  templateUrl: './list-recap.component.html',
  styleUrls: ['./list-recap.component.scss']
})

export class ListRecapComponent implements OnInit {

  //voir Basket & Product-card

  @Input() product?: Product;
  @Input() quantity!: number;
  @Input() cartLine?: CartLine;
  @Output() discountApplied = new EventEmitter<number>();

  total!: number;
  totalAfterDiscount: number | undefined;

  basket$!: Cart;
  cartLine$!: CartLine[];

  displayedColumns: string[] = ['Nom du produit', 'Quantité', 'PU', 'Réduction', 'Total', ''];
  productList$: Observable<Product[]> | undefined;
  productList: Product[] = [];

  formDiscount = new UntypedFormGroup({
    discount: new UntypedFormControl('', [Validators.required]),
    unit: new UntypedFormControl('percentage'),
  })

  discount: number | undefined;
  discountUnit : string | undefined;
  classNameAfterDiscount: string = 'totalAfterDiscount-hidden';
  classNameBeforeDiscount: string = 'totalBeforeDiscount';
  cancelButton: string = 'cancel-hidden';
  applyButton: string = 'apply';


  constructor(private productService: ProductService, private basketService: BasketService) { };

  ngOnInit(): void {
    this.productList$ = this.productService.getProducts();
    this.productList$.subscribe(products => { this.productList = products });
    console.log(this.productList);

    this.basketService.basket$.subscribe((basket: Cart) => {
      this.basket$ = basket;
      this.cartLine$ = basket.getCartLines();
      this.calculateTotal();
    });
  }

  minus(id: number) {
    this.basket$.getCartLines().forEach((line) => {
      if (line.getId() === id) {
        line.setQuantity(-1);
        if (line.getQuantity() === 0){
          this.removeItem(id);
        }
      }
    })
    this.basketService.updateBasket(this.basket$);
    if (this.totalAfterDiscount){
      this.cancelDiscount();
    }
  }

  add(id: number) {
  
      this.basket$.getCartLines().forEach((line) => {
        if (line.getId() === id) {
          line.setQuantity(1);
        }
    })

    this.basketService.updateBasket(this.basket$);
    if (this.totalAfterDiscount){
      this.cancelDiscount();
    }
  }

  calculateTotal(): void {
    let total = 0;
  
    this.cartLine$.forEach((cartLine) => {
      total += cartLine.getTotal();
    });
  
    this.total = total;
    this.basket$.setTotal(total);
  }

  removeItem(id:number){
      this.basket$.removeLines(id);
      this.basketService.updateBasket(this.basket$);  
      if (this.totalAfterDiscount){
        this.cancelDiscount();    
      }
  }

  protected submitDiscount(event: Event): void {
    event.preventDefault();
    this.discount = parseFloat(this.formDiscount.controls["discount"].value);
    this.discountUnit = this.formDiscount.controls["unit"].value;
    if ( this.discountUnit == 'percentage') {
      this.totalAfterDiscount = this.total - (this.total * this.discount/100);
    } else if ( this.discountUnit == 'euro' ) {
      this.totalAfterDiscount = this.total - this.discount;
    }
    this.discountApplied.emit(this.totalAfterDiscount);
    this.toggleClassDiscount();
  }

  protected cancelDiscount(): void {
    this.toggleClassDiscount();
    this.totalAfterDiscount = undefined;
    this.formDiscount.reset();
  }

  private toggleClassDiscount(): void {
    this.classNameBeforeDiscount == 'totalBeforeDiscount' ? this.classNameBeforeDiscount = 'totalBeforeDiscount-crossed' : this.classNameBeforeDiscount = 'totalBeforeDiscount';
    this.classNameAfterDiscount == 'totalAfterDiscount-hidden' ? this.classNameAfterDiscount = 'totalAfterDiscount-show' : this.classNameAfterDiscount = 'totalAfterDiscount-hidden';
    this.cancelButton == 'cancel-hidden' ? this.cancelButton = 'cancel-show' : this.cancelButton = 'cancel-hidden';
    this.applyButton == 'apply' ? this.applyButton = 'apply-hidden' : this.applyButton = 'apply';
  }
}
