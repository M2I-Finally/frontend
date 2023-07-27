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

  /**
   * When clicked, creates a new row at the end of the table with the filled input name
   */
  protected createCategory(): void {
    const categoryInput = document.getElementById("input-category")! as HTMLInputElement;
 
    if(categoryInput.value) {
      // Creates a category and merge the result to the current table
      this.categoryService.postCategory({
          id: Math.floor(Math.random() *9999999),
          name: categoryInput.value,
          isActive: true,
      }).subscribe(category => {
          this.categoryList?.push(category);
      })
    }
  }

  /**
   * When clicked, deletes the selected row entry from the list
   * @param categoryIndex Number that represents the line number of the table
   * @param categoryId Number that represents the category number in database
   */
  protected deleteCategory(categoryIndex: number, categoryId: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe(() => {
      this.categoryList?.splice(categoryIndex, 1);
    })
  }

  /**
   * When clicked, shows the input block in the selected row
   * @param categoryIndex Number that represents the line number of the table
   */
  protected showUpdateCategoryInput(categoryIndex: number): void {
    
    // Handle input for the name update
    const categoryNameCell = document.getElementById(`category-name-${categoryIndex}`)!;
    const categoryNameValue = categoryNameCell.getElementsByTagName("span").item(0)!;
    const categoryNameInputBlock = categoryNameCell?.getElementsByTagName("div").item(0)!;
    const categoryNameInput = categoryNameInputBlock?.getElementsByTagName("input").item(0)! as HTMLInputElement;

    console.log(categoryNameCell);

    // Get initial value and populate it in the input
    const initialValue = categoryNameValue.innerText;
    if(initialValue) {
        categoryNameInput.value = initialValue;
    }

    categoryNameValue.style.display = "none";
    categoryNameInputBlock.style.display = "block";

  }

  /**
   * When clicked, hides the input block from the selected row
   * @param categoryIndex Number that represents the line number of the table
   */
  protected hideUpdateCategoryInput(categoryIndex: number): void {
    const categoryNameCell = document.getElementById(`category-name-${categoryIndex}`)!;
    const categoryNameValue = categoryNameCell.getElementsByTagName("span").item(0)!;
    const categoryNameInputBlock = categoryNameCell?.getElementsByTagName("div").item(0)!;

    // Hide input block
    categoryNameValue.style.display = "block";
    categoryNameInputBlock.style.display = "none";
  }

  /**
   * Processes the update of the category and saves it into the database
   * @param categoryIndex Number that represents the line number of the table
   * @param categoryId Number that represents the category number in database
   */
  protected updateCategory(categoryIndex: number, categoryId: number): void {
    const categoryNameCell = document.getElementById(`category-name-${categoryIndex}`)!;
    const categoryNameValue = categoryNameCell.getElementsByTagName("span").item(0)!;
    const categoryNameInputBlock = categoryNameCell?.getElementsByTagName("div").item(0)!;
    const categoryNameInput = categoryNameInputBlock?.getElementsByTagName("input").item(0)! as HTMLInputElement;

    // Hide input block
    categoryNameValue.style.display = "block";
    categoryNameInputBlock.style.display = "none";
    
    // Edit the value on the list
    categoryNameValue.innerText = categoryNameInput.value;

    // Save product to database (temporary until we make the database)
    this.categoryService.putCategory(categoryId, {
      id: categoryId,
      name: categoryNameInput.value,
      isActive: true,
    }).subscribe(data => console.log(data));
  }


}
