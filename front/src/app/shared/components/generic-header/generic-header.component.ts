import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { Jwt } from 'src/app/shared/entities/jwt';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../entities/category';

@Component({
  selector: 'generic-header',
  templateUrl: './generic-header.component.html',
  styleUrls: ['./generic-header.component.scss']
})
export class GenericHeaderComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService, private userService: UserService, private categoryService: CategoryService) { }

  /**
   * This output specifies if an action has to be made if we click on the logo to go back home
   */
  @Output() actionWhenHomeButtonClicked = new EventEmitter();

  @Output() categorySelectedMobile = new EventEmitter<number>();

  /** 
   * If we enable escaping, it means that users can click on logout button and escape from the current page.
   * By default it is set to true because in most case escaping is not a problem
   **/
  @Input() escapeEnabled: boolean = true;
  categoryList$: Observable<Category[]> | undefined;

  protected currentRoute: string = this.router.url;

  // By default we assume that it is an employee, so we don't show admin button by error
  protected currentUserRole: String = 'EMPLOYEE';
  protected isAdmin: boolean = false;

  formPassword = new UntypedFormGroup({
    password: new UntypedFormControl()
  })

  ngOnInit(): void {
    this.categoryList$ = this.categoryService.getCategories();
    let sessionToken = sessionStorage.getItem('token');
    if(sessionToken != undefined) {
      let decoded: Jwt = jwt_decode(sessionToken);
      this.currentUserRole = decoded.role;
      if( decoded.role == 'ADMIN' ) {
        this.isAdmin = true;
      }
    }
  }

  goHome(): void {
    this.goToPage('/shop');

    // This will trigger the other method associated with the logo click
    this.actionWhenHomeButtonClicked.emit();
  }

  protected goToPage(pageName:string): void {
    this.router.navigate([`${pageName}`]);
  }

  changeCategoryMobile(event: Event) {
    let categoryId = parseInt((event.currentTarget as HTMLElement).id);
    this.categorySelectedMobile.emit(categoryId);
  }

  protected confirmPassword(): void {
    let sessionToken = sessionStorage.getItem('token');
    if(sessionToken != undefined) {
      let decoded: Jwt = jwt_decode(sessionToken);
      let connectedUserId = decoded.id;
      //appeler la méthode qui vérifiera le mdp
      if( this.formPassword.controls["password"].value != undefined) {
        this.userService.checkPassword(connectedUserId, this.formPassword.controls["password"].value).subscribe({
          next: (res: boolean) => {
            if(res) {
              this.goToPage('logout');
            } else {
              this.toastr.error('identifiant invalide');
              this.formPassword.controls["password"].setValue('');             
            }
          }
        })      
      }else {
        this.authService.logout();
        this.router.navigateByUrl('/');
      }
      
    }
  }
}
