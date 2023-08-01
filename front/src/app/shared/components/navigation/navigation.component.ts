import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../entities/category';
import { ProductService } from 'src/app/shared/services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  categoryList$: Observable<Category[]> | undefined;

  @Output() categorySelected = new EventEmitter<number>();

  constructor(private categoryService: CategoryService, private productService: ProductService) {}

  ngOnInit(): void {
    this.categoryList$ = this.categoryService.getCategories();
  }

  changeCategory(event: Event) {
    let categoryId = parseInt((event.currentTarget as HTMLElement).id);
    this.categorySelected.emit(categoryId);
  }
}
