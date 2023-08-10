import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, mergeMap } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/entities/user';
import { Jwt } from 'src/app/shared/entities/jwt';
import jwt_decode from "jwt-decode";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-user-table',
  templateUrl: './admin-user-table.component.html',
  styleUrls: ['./admin-user-table.component.scss']
})
export class AdminUserTableComponent implements OnInit {
  modeText: string = "Ajouter";
  successText: string = "Utilisateur créé";
  userList: User[] | undefined;
  userList$: Observable<User[]> | undefined;
  selectedUser: User | undefined;
  selectedUserName: string | undefined;
  selectedUserId: number | undefined;
  selectedUserPassword: string | undefined;
  selectedUserRole: string | undefined;
  loggedUserId: number | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private toastr: ToastrService) {};

  formUser = new UntypedFormGroup({
    userId: new UntypedFormControl(''),
    userName: new UntypedFormControl('', [Validators.required]),
    userPassword: new UntypedFormControl('', [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
    confirmationPassword: new UntypedFormControl('', [Validators.required]),
    userRole: new UntypedFormControl('EMPLOYEE', [Validators.required]),
  })

  ngOnInit(): void {
    this.getUser();
    let sessionToken = sessionStorage.getItem('token');
    let decoded: Jwt = jwt_decode(sessionToken!);
    this.loggedUserId = decoded.id;
  }

  protected goToPage(pageName:string): void {
    this.router.navigate([`${pageName}`])
  }

  protected getUser(): void {
    this.userList$ = this.userService.getUsers();
    this.userService.getUsers()
      .subscribe({
        next: (res) => this.userList = res,
        error: (err) => console.log(err)
      });
  }

  protected deleteUser(): void {    
    if( this.selectedUserId == this.loggedUserId ) {
      this.toastr.error("Impossible de supprimer l'utilisateur connecté")
    } else {
      // Delete user = switch status to false in DB
      this.userService.patchUserStatus(this.selectedUserId!).subscribe({
        next: () => {
          this.getUser()
        }
      });
      this.toastr.success("Utilisateur supprimé");
    }
  }

  private populateForm(user: User) {
    this.formUser.controls["userId"].setValue(this.selectedUserId);
    this.formUser.controls["userName"].setValue(this.selectedUserName);
    this.formUser.controls["userPassword"].setValue(this.selectedUserPassword);
    this.formUser.controls["confirmationPassword"].setValue(this.selectedUserPassword);
    this.formUser.controls["userRole"].setValue(this.selectedUserRole);
  }

  protected editUser(): void {
    this.modeText = "Modifier";
    this.successText = "Utilisateur modifié";
    this.formUser.controls["userPassword"].clearValidators();
    this.formUser.controls["confirmationPassword"].clearValidators();
    this.userService.getUserById(this.selectedUserId).subscribe({
      next: res => {
        this.populateForm(res);
      }
    })
  }

  protected onClick(event:Event): void {
    let userId: number = parseInt((event.currentTarget as HTMLInputElement).id);
    this.selectedUser = this.userList?.find(user => user.id === userId);
    this.selectedUserName = this.selectedUser?.username;
    this.selectedUserId = this.selectedUser?.id;
    this.selectedUserPassword = this.selectedUser?.password;
    this.selectedUserRole = this.selectedUser?.role;
  }

  protected submit(): void {
    let regex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}");
    if(this.modeText == "Ajouter") {
      if(this.formUser.controls["userPassword"].value == this.formUser.controls["confirmationPassword"].value) {
        this.userService.postUser({
          username: this.formUser.controls["userName"].value,
          password: this.formUser.controls["userPassword"].value,
          passwordConfirm: this.formUser.controls["confirmationPassword"].value,
          role: this.formUser.controls["userRole"].value
        }).subscribe({
          next: () => {
            this.getUser()
          }
        }
        );
        this.toastr.success("Utilisateur créé");
        this.cancel();
      } else {
        this.toastr.error("Le mot de passe et sa confirmation doivent être identiques");
      }
    } else if(this.modeText == "Modifier") {
      if( this.formUser.controls["userPassword"].value != null && regex.test(this.formUser.controls["userPassword"].value) == false ) {
        this.toastr.error("Le mot de passe doit contenir au moins 8 caractères, 1 chiffre, 1 minuscule, 1 majuscule et un caractère spécial ($@$!%*?&)");
      } else if( this.formUser.controls["userPassword"].value != this.formUser.controls["confirmationPassword"].value ) {
        this.toastr.error("Le mot de passe et sa confirmation doivent être identiques");
      } else if( this.formUser.controls["userPassword"].value == this.formUser.controls["confirmationPassword"].value ) {
        this.userService.putUser(this.selectedUserId!, {
          id: this.formUser.controls["userId"].value,
          username: this.formUser.controls["userName"].value,
          password: this.formUser.controls["userPassword"].value,
          passwordConfirm: this.formUser.controls["confirmationPassword"].value,
          role: this.formUser.controls["userRole"].value
        }).subscribe({
          next: () => {
            this.getUser()
          }
        });
        this.toastr.success("Utilisateur modifié");
        this.cancel();
      }
    }
  }

  protected cancel(): void {
    this.formUser.reset();
    this.modeText = "Ajouter";
    this.formUser.controls["userRole"].setValue('EMPLOYEE');
  }
}

