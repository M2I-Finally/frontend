import { Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/entities/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-category-table',
  templateUrl: './admin-category-table.component.html',
  styleUrls: ['./admin-category-table.component.scss']
})
export class AdminCategoryTableComponent implements OnInit {

  protected categoryList: Category[] | undefined;
  constructor(private categoryService: CategoryService, private toastr: ToastrService) {}

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
          name: categoryInput.value
      })
      .subscribe({
        next: category => this.categoryList?.push(category),
        error: error => this.toastr.error(error.error.message, "Erreur"),
    });
    }
  }

  /**
   * When clicked, deletes the selected row entry from the list
   * @param categoryIndex Number that represents the line number of the table
   * @param categoryId Number that represents the category number in database
   */
  protected deleteCategory(categoryIndex: number, categoryId: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe();
    this.categoryList?.splice(categoryIndex, 1);
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

    // Get initial value and populate it in the input
    const initialValue = categoryNameValue.innerText;
    if(initialValue) {
        categoryNameInput.value = initialValue;
    }

    this.toggleInputBlock(true, categoryIndex);
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
    this.toggleInputBlock(false, categoryIndex);
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

    this.toggleInputBlock(false, categoryIndex);
    
    // Edit the value on the list
    categoryNameValue.innerText = categoryNameInput.value;

    // Save product to database (temporary until we make the database)
    this.categoryService.patchCategoryName(categoryId, categoryNameInput.value).subscribe();
  }

  /**
   * Toggles the input block for category editing
   * @param isToggled  a boolean, true if we want to show the input, otherwise false
   * @param categoryIndex Number that represents the category number in database
   */
  private toggleInputBlock(isToggled: boolean, categoryIndex: number): void {
    const categoryNameCell = document.getElementById(`category-name-${categoryIndex}`)!;
    const categoryNameValue = categoryNameCell.getElementsByTagName("span").item(0)!;
    const categoryNameInputBlock = categoryNameCell?.getElementsByTagName("div").item(0)!;
    const categoryNameInput = categoryNameInputBlock?.getElementsByTagName("input").item(0)! as HTMLInputElement;

    if(isToggled) {
      categoryNameValue.style.display = "none";
      categoryNameInputBlock.style.display = "block";
    } else {
      categoryNameValue.style.display = "block";
      categoryNameInputBlock.style.display = "none";
    }
  } 

  /**
   * Patch the status of a given category
   * @param categoryId Number tha represents the category number in database
   */
  protected changeActiveState(categoryId: number): void {
    this.categoryService.patchCategoryStatus(categoryId).subscribe();
  }
}
