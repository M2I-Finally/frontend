import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/entities/product';
import { ProductService } from 'src/app/mockupData/product.service';
import { Observable, mergeMap,} from 'rxjs';

@Component({
  selector: 'admin-products-table',
  templateUrl: './admin-product-table.component.html',
  styleUrls: ['./admin-product-table.component.scss'],
})
export class AdminProductsTableComponent implements OnInit {

  constructor(private productService: ProductService) {}
  
  modalDelete!: HTMLDialogElement;
  protected productList$:Observable<Product[]> | undefined;
  selectedProduct: Product | undefined;

  public ngOnInit(): void {

    this.modalDelete = document.getElementById("delete-dialog") as HTMLDialogElement;

    // This will merge the new results even after page refresh
    this.productList$ =  this.productService.getProducts().pipe(
      mergeMap(() => this.productService.getProducts())
    );
  }

  protected showDeleteModal(product: Product): void {
    this.selectedProduct = product;
    this.modalDelete.showModal();
  }

  protected closeDeleteModal(): void {
    this.modalDelete.close();
  }
  
  protected deleteProduct(productId: number): void {
    // This will subscribe to the only result returned from the observable (and thus unsubscribe)
    this.productList$ = this.productService.deleteProduct(productId).pipe(
      mergeMap(() => this.productService.getProducts())
    );
    
    this.closeDeleteModal();
  }
}