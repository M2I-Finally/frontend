import { Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/entities/category';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-category-table',
  templateUrl: './admin-category-table.component.html',
  styleUrls: ['./admin-category-table.component.scss']
})
export class AdminCategoryTableComponent implements OnInit {

  protected categoryList: Category[] | undefined;
  protected selectedCategory: Category | undefined;
  protected selectedCategoryIndex: number | undefined;
  protected modalDelete: HTMLDialogElement | undefined;
  constructor(private categoryService: CategoryService, private toastr: ToastrService, private router: Router) {}

  // Form control for category name input
  categoryName = new FormControl('',
           [Validators.pattern("[a-zA-Z ]+")]);

  ngOnInit(): void {
      this.modalDelete = document.getElementById("delete-dialog") as HTMLDialogElement;
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
      this.categoryService.postCategory(categoryInput.value)
      .subscribe({
        next: category => { 
          category.productCount = 0;
          this.categoryList?.push(category);
          categoryInput.value = "";
          this.toastr.success("Catégorie créée avec succès")
        },
        error: error => this.toastr.error(error.message),
    });
    }
  }

  /**
   * When clicked, deletes the selected row entry from the list
   * @param categoryIndex Number that represents the line number of the table
   * @param categoryId Number that represents the category number in database
   */
  protected deleteCategory(categoryIndex: number, categoryId: number): void {
    
    if(this.categoryList != undefined && this.categoryList[categoryIndex].productCount! <= 0) {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: category => { 
          this.categoryList?.splice(categoryIndex, 1);
          this.toastr.success("Catégorie supprimée avec succès")
        },
        error: error => this.toastr.error(error.error.message),
      });
    } else {
      this.toastr.error("Impossible de supprimer une catégorie qui contient des produits");
    }
    this.modalDelete?.close();
  }

    // Shows the delete modal with appropriate product settings
    protected showDeleteModal(category: Category, categoryIndex: number): void {
      this.selectedCategory = category;
      this.selectedCategoryIndex = categoryIndex;
      this.modalDelete?.showModal();
    }
  
    // Closes the delete modal
    protected closeDeleteModal(): void {
      this.modalDelete?.close();
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
    
    // Save product to database
    this.categoryService.patchCategoryName(categoryId, categoryNameInput.value).subscribe({
      next: () => {
        categoryNameValue.innerText = categoryNameInput.value;
        this.toastr.success(`La catégorie a été modifiée`)
      },
      error: error => this.toastr.error(error.error.message),
    });
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
    this.categoryService.patchCategoryStatus(categoryId).subscribe({
      error: error => this.toastr.error(error.error.message)
    });
  }

  protected goToPage(pageName:string): void {
    this.router.navigate([`${pageName}`])
  }
}
