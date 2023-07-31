import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/entities/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss', '../../../../../shared/components/product-card/product-card.component.scss'],
 
})
export class FormProductComponent implements OnInit {
  
  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService, private categoryService: CategoryService) {};

  protected modeText: string = "Ajouter";
  
  // Image preview related informations
  protected imagePlaceholderURI = "./assets/img/no-photo.jpg";
  protected currentImage?: File;
  protected imagePreview = '';
  protected categoryList$ = this.categoryService.getCategories();
 
  // Form that handles the addition or edition of a product
  formProduct = new UntypedFormGroup({
    productId: new UntypedFormControl(''),
    productName: new UntypedFormControl('', [Validators.required]),
    productDescription: new UntypedFormControl(''),
    productPrice: new UntypedFormControl('', [Validators.required, Validators.min(0)]),
    productTax: new UntypedFormControl('', [Validators.required]),
    productImage: new UntypedFormControl(''),
    productCategory: new UntypedFormControl(''),
  });

  ngOnInit(): void {
  
    // If form is on edit mode and the id is correct
    if(this.getActionParameterFromUrl() == "edit" && this.getIdParameterFromUrl()) {
      this.modeText = "Modifier";
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
    this.formProduct.controls["productId"].setValue(product.productId);
    this.formProduct.controls["productName"].setValue(product.name);
    this.formProduct.controls["productDescription"].setValue(product.description);
    this.formProduct.controls["productPrice"].setValue(product.price);
    this.formProduct.controls["productTax"].setValue(product.tax);
    this.formProduct.controls["productCategory"].setValue(product.category.id);

    if(product.picture) {
      this.formProduct.controls["productImage"].setValue(product.picture);
    }
  }

  // Called when redirecting to table and refresh the component to get the new datas
  protected redirectToTable(): void {
    this.router.navigateByUrl('/products', { skipLocationChange: false }).then(() => {
      this.router.navigate(['/products']);
    }); 
  }

  // Called when form is submitted
  protected submit():void{
      if(this.getActionParameterFromUrl() == "add") {
        
        // Save product to database (temporary until we make the database)
        this.productService.postProduct({
            productId: this.formProduct.controls["productId"].value,
            name: this.formProduct.controls["productName"].value,
            price: this.formProduct.controls["productPrice"].value,
            tax: this.formProduct.controls["productTax"].value,
            description: this.formProduct.controls["productDescription"].value,
            status: true,
            stock: 0,
            picture: this.formProduct.controls["productImage"].value,
            category: this.formProduct.controls["productCategory"].value,
        }).subscribe({
          // Redirects when product is saved
          next: () => {
            this.router.navigate(['products']);
          }
        });

        
      } 
      else if(this.getActionParameterFromUrl() == "edit") {
        
        // Save product to database (temporary until we make the database)
        this.productService.putProduct(this.formProduct.controls["productId"].value, {
          productId: this.formProduct.controls["productId"].value,
          name: this.formProduct.controls["productName"].value,
          price: this.formProduct.controls["productPrice"].value,
          tax: this.formProduct.controls["productTax"].value,
          description: this.formProduct.controls["productDescription"].value,
          status: true,
          stock: 0,
          picture: this.formProduct.controls["productImage"].value,
          category: this.formProduct.controls["productCategory"].value,
        }).subscribe({
          // Redirects when product is saved
          next: () => {
            this.router.navigate(['products']);
          }
        });
      }
  };

  protected selectFile(event: any): void {
    // Ensure that the placeholder is set when loading the image
    this.imagePreview = '';

    if (event.target.files) {
      const file: File | null = event.target.files.item(0);
  
      if (file) {
        this.imagePreview = '';
        this.currentImage = file;
  
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreview = e.target.result;
        };

        // This method transforms the data output by the result into a real object image
        reader.readAsDataURL(this.currentImage);
        this.toggleImageDeleteButton(true);
      }
    }
  }

  // Toggle the image delete button when image is uploaded
  protected toggleImageDeleteButton(isToggled: boolean): void {
      const fileInput = document.getElementById("file-input") as HTMLInputElement;
      const fileDelete = document.getElementById("file-delete") as HTMLButtonElement;
      
      // Cosmetics on button
      if(isToggled) {
        fileInput.style.width = "90%";
        fileDelete.style.display = "inline-block";
      } else {
        fileInput.style.width = "100%";
        fileDelete.style.display = "none";

        // Delete the image from the input and change the preview to placeholder
        this.imagePreview = this.imagePlaceholderURI;
        fileInput.value = "";
      }
  }

}

