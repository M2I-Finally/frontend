import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/entities/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/mockupData/product.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss', '../../../../../shared/components/product-card/product-card.component.scss'],
 
})
export class FormProductComponent implements OnInit {
  
  protected imagePlaceHolderURI = "./assets/img/no-photo.jpg";
  protected currentFile?: File;
  protected imagePreview = '';
 
  modeText: string = "Ajouter";
  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) {};

  // Form that handles the addition or edition of a product
  formProduct = new UntypedFormGroup({
    productId: new UntypedFormControl(''),
    productName: new UntypedFormControl('', [Validators.required]),
    productDescription: new UntypedFormControl(''),
    productPrice: new UntypedFormControl('', [Validators.required, Validators.min(0)]),
    productImage: new UntypedFormControl(''),
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
      this.redirectToTable();
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
      this.redirectToTable();
    }

    return temporaryActionParameter;
  }

  // Called when observable gets a result on getProductById()
  private populateForm(product: Product): void {
    this.formProduct.controls["productId"].setValue(product.id);
    this.formProduct.controls["productName"].setValue(product.name);
    this.formProduct.controls["productDescription"].setValue(product.id);
    this.formProduct.controls["productPrice"].setValue(product.price);

    if(product.image) {
      this.formProduct.controls["productImage"].setValue(product.image);
    }

    this.modeText = "Modifier";
  }

  // Called when redirecting to table and refresh the component to get the new datas
  protected redirectToTable(): void {
    this.router.navigateByUrl('/table', { skipLocationChange: false }).then(() => {
      this.router.navigate(['/table']);
    }); 
  }

  // Called when form is submitted
  protected submit():void{
      if(this.getActionParameterFromUrl() == "add") {
        
        // Save product to database (temporary until we make the database)
        this.productService.postProduct({
            id: this.formProduct.controls["productId"].value,
            name: this.formProduct.controls["productName"].value,
            price: this.formProduct.controls["productPrice"].value,
            isActive: true,
            stock: 0,
            image: this.formProduct.controls["productImage"].value,
        }).subscribe(data => console.log(data));

        // Redirects when product is saved
        this.redirectToTable();

      } 
      else if(this.getActionParameterFromUrl() == "edit") {
        
        // Save product to database (temporary until we make the database)
        this.productService.putProduct(this.formProduct.controls["productId"].value, {
          id: this.formProduct.controls["productId"].value,
          name: this.formProduct.controls["productName"].value,
          price: this.formProduct.controls["productPrice"].value,
          isActive: true,
          stock: 0,
          image: this.formProduct.controls["productImage"].value,
        }).subscribe(data => console.log(data));

        this.redirectToTable();
      }
  };

  selectFile(event: any): void {
    this.imagePreview = '';

    if (event.target.files) {
      const file: File | null = event.target.files.item(0);
  
      if (file) {
        this.imagePreview = '';
        this.currentFile = file;
  
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          this.imagePreview = e.target.result;
        };
  
        reader.readAsDataURL(this.currentFile);
      }
    }
  }
  

}

