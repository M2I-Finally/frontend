import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/entities/product';
import { ProductService } from 'src/app/mockupData/product.service';
import { Observable, first, mergeMap} from 'rxjs';

@Component({
  selector: 'admin-products-table',
  templateUrl: './admin-product-table.component.html',
  styleUrls: ['./admin-product-table.component.scss'],
})
export class AdminProductsTableComponent implements OnInit {

  constructor(private productService: ProductService) {}
  
  protected modalDelete!: HTMLDialogElement;
  protected productList$:Observable<Product[]> | undefined;
  protected selectedProduct: Product | undefined;

  public ngOnInit(): void {

    this.modalDelete = document.getElementById("delete-dialog") as HTMLDialogElement;

    // This will merge the new results even after page refresh
    this.productList$ =  this.productService.getProducts().pipe(
      mergeMap(() => this.productService.getProducts())
    );
  }

  // Change active state of a product when clicked
  protected changeActiveState(event: Event, productId: number): void {
   
    const checkbox = event.target as HTMLInputElement;
    console.log(checkbox);

    if(checkbox.checked == true) {
      console.log("Handling active state");
    } else {
      console.log("Handling inactive state")
    }

  }

  // Shows the delete modal with appropriate product settings
  protected showDeleteModal(product: Product): void {
    this.selectedProduct = product;
    this.modalDelete.showModal();
  }

  // Closes the delete modal
  protected closeDeleteModal(): void {
    this.modalDelete.close();
  }
  
  protected deleteProduct(productId: number): void {
    
    // This will subscribe to the only result returned from the observable (and thus unsubscribe)
    this.productList$ = this.productService.deleteProduct(productId).pipe(first(),
      mergeMap(() => this.productService.getProducts())
    );
    
    this.closeDeleteModal();
  }
}