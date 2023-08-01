import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../entities/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  categoryList$: Observable<Category[]> | undefined;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryList$ = this.categoryService.getCategories();
  }
}
