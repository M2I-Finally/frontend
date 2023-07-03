import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Product } from 'src/app/shared/entities/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/mockupData/product.service';
import { map, pipe } from 'rxjs';


@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
 
})
export class FormProductComponent implements OnInit {

  currentProduct: Product | undefined;
  idParameter!: number;  
  constructor(private route: ActivatedRoute, private productService: ProductService) {};

  formEditProduct = new UntypedFormGroup({
    id: new UntypedFormControl(),
    productName: new UntypedFormControl(),
    productDescription: new UntypedFormControl(),
    productPrice: new UntypedFormControl(),
    productImage: new UntypedFormControl()
  });

  ngOnInit(): void {
    this.productService.getProductById(this.getIdParameterFromUrl())
    .subscribe(
      {
        next: res => { 
          this.currentProduct = res
          this.populateForm(this.currentProduct);
        }
      }
    );
  }

  /* Called to get the "id" get parameter in the url
  Does additionnal checks on the input (not implemented yet !)*/
  getIdParameterFromUrl(): number {
    this.route.queryParamMap.subscribe(params => {
      this.idParameter = Number(params?.get("id"));
    });

    return this.idParameter;
  }

  // Called when observable gets a result
  populateForm(product: Product): void {
    this.formEditProduct.controls["id"].setValue(product.id);
    this.formEditProduct.controls["productName"].setValue(product.name);
    this.formEditProduct.controls["productDescription"].setValue(product.id);
    this.formEditProduct.controls["productPrice"].setValue(product.price);
    this.formEditProduct.controls["productImage"].setValue(product.image);
  }

  // Called when form is submitted
  submit():void{

  };

}
