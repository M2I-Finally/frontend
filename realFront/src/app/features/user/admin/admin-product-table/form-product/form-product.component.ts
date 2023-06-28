import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Product } from 'src/app/shared/entities/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/mockupData/product.service';
import { map, pipe } from 'rxjs';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  currentProduct: Product | undefined;  
  constructor(private route: ActivatedRoute, private productService: ProductService) {};

  formEditProduct = new UntypedFormGroup({
    id: new UntypedFormControl(),
    productName: new UntypedFormControl()
  });

  ngOnInit(): void {
    
    // Getting parameters
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
    });

    this.productService.getSingleProduct(1).subscribe({
      next: res => { 
        this.formEditProduct.controls["id"].setValue(res.id);
      }
    });

    // Setting controls on edit
    

  }


}
