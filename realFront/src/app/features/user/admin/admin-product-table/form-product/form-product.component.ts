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

  productButtonText: string = "Ajouter le produit";
  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) {};

  // Form that handles the addition or removal of a product
  formProduct = new UntypedFormGroup({
    productId: new UntypedFormControl(),
    productName: new UntypedFormControl(),
    productDescription: new UntypedFormControl(),
    productPrice: new UntypedFormControl(),
    productImage: new UntypedFormControl(),
  });

  ngOnInit(): void {
    
    // If form is on edit mode and the id is correct
    if(this.getActionParameterFromUrl() == "edit" && this.getIdParameterFromUrl()) {
      this.productService.getProductById(this.getIdParameterFromUrl())
      .subscribe(
        {
          next: res => { 
            this.populateForm(res);
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
      temporaryIdParameter = params.get("id");
    });

    // If it's not a number then we redirect the user to the table page
    if(isNaN(Number(temporaryIdParameter)) || temporaryIdParameter == undefined || !temporaryIdParameter) {
      this.router.navigate(['/table']);
    } 

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

    // If the action mode is incorrect then we redirect the user to the table page
    if(!(temporaryActionParameter === "edit" || temporaryActionParameter === "add") || temporaryActionParameter == undefined || !temporaryActionParameter) {
      this.router.navigate(['/table']);
    }

    return temporaryActionParameter;
  }

  // Called when observable gets a result on getProductById()
  private populateForm(product: Product): void {
    this.formProduct.controls["productId"].setValue(product.id);
    this.formProduct.controls["productName"].setValue(product.name);
    this.formProduct.controls["productDescription"].setValue(product.id);
    this.formProduct.controls["productPrice"].setValue(product.price);
    this.formProduct.controls["productImage"].setValue(product.image);
    this.productButtonText = "Editer le produit";
  }

  // Called when form is submitted
  protected submit():void{
      if(this.getActionParameterFromUrl() == "add") {
        console.log("let's add !");
      } 
      else if(this.getActionParameterFromUrl() == "edit") {
        console.log("let's edit !");
      }
  };

}
