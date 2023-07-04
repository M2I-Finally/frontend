import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Product } from 'src/app/shared/entities/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/mockupData/product.service';
import { map, pipe } from 'rxjs';


@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
 
})
export class FormProductComponent implements OnInit {

  currentProduct: Product | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) {};

  formEditProduct = new UntypedFormGroup({
    id: new UntypedFormControl(),
    productName: new UntypedFormControl(),
    productDescription: new UntypedFormControl(),
    productPrice: new UntypedFormControl(),
    productImage: new UntypedFormControl()
  });

  ngOnInit(): void {
    
    // If form is on edit mode and the id is correct
    if(this.getActionParameterFromUrl() == "edit" && this.getIdParameterFromUrl() != null) {
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

  }

  /* Called to get the "id" get parameter in the url
  Does additionnal checks on the input (not implemented yet !)*/
  private getIdParameterFromUrl(): number {
    let temporaryIdParameter;
    this.route.queryParamMap.subscribe(params => {
      temporaryIdParameter = params?.get("id");
    });

    // If it's not a number then we redirect the user to the table page
    if(isNaN(Number(temporaryIdParameter))) {
      this.router.navigate(['/table']);
    } 

    // Otherwise, we return the id
    return Number(temporaryIdParameter);
  }

  /**
   * Called to get the "action" get parameter in the url
   * Action either takes "edit" or "add" depending on the context
   */
  private getActionParameterFromUrl(): string | undefined {
    
    let temporaryActionParameter;
    this.route.queryParamMap.subscribe(params => {
      temporaryActionParameter = params?.get("action");
    });

    if(!(temporaryActionParameter === "edit" || temporaryActionParameter === "add")) {
      this.router.navigate(['/table']);
    }

    return temporaryActionParameter;
  }

  // Called when observable gets a result
  private populateForm(product: Product): void {
    this.formEditProduct.controls["id"].setValue(product.id);
    this.formEditProduct.controls["productName"].setValue(product.name);
    this.formEditProduct.controls["productDescription"].setValue(product.id);
    this.formEditProduct.controls["productPrice"].setValue(product.price);
    this.formEditProduct.controls["productImage"].setValue(product.image);
  }

  // Called when form is submitted
  private submit():void{

  };

}
