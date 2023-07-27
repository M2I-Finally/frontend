import { Component, OnInit } from '@angular/core';
import { Observable, first, mergeMap } from 'rxjs';
import { CategoryService } from 'src/app/mockupData/category.service';
import { Category } from 'src/app/shared/entities/category';

@Component({
  selector: 'app-admin-category-table',
  templateUrl: './admin-category-table.component.html',
  styleUrls: ['./admin-category-table.component.scss']
})
export class AdminCategoryTableComponent implements OnInit {

  protected categoryList: Category[] | undefined;
  constructor(private categoryService: CategoryService) {}
  
  ngOnInit(): void {
      this.categoryService.getCategories().subscribe(categories => {
        this.categoryList = categories as Category[]
      })
  }

  // Creates a category and append it to the table
  protected createCategory(): void {
    const categoryInput = document.getElementById("input-category") as HTMLInputElement;
 
    if(categoryInput.value) {
      
      // Creates a category and merge the result to the current table
      const newCategory = this.categoryService.postCategory({
          id: Math.floor(Math.random() *9999999),
          name: categoryInput.value,
          isActive: true,
      }).subscribe(category => {
          this.categoryList?.push(category);
      })
    }
 
  }

}
