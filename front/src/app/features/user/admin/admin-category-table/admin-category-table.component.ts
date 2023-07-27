import { Component, OnInit } from '@angular/core';
import { Observable, mergeMap } from 'rxjs';
import { CategoryService } from 'src/app/mockupData/category.service';
import { Category } from 'src/app/shared/entities/category';

@Component({
  selector: 'app-admin-category-table',
  templateUrl: './admin-category-table.component.html',
  styleUrls: ['./admin-category-table.component.scss']
})
export class AdminCategoryTableComponent implements OnInit {

  protected categoryList$: Observable<Category[]> | undefined;
  constructor(private categoryService: CategoryService) {}
  
  ngOnInit(): void {
      this.categoryList$ =  this.categoryService.getCategories().pipe(
        mergeMap(() => this.categoryService.getCategories())
      );
  }

  // Creates a category and append it to the table
  protected createCategory():void {
    const categoryInput = document.getElementById("input-category") as HTMLInputElement;
    this.categoryService.getCategories();
    if(categoryInput.value) {
      console.log("valid")
    }
 
  }

}
