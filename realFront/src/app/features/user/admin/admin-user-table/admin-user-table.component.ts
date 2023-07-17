import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, mergeMap } from 'rxjs';
import { UserService } from 'src/app/mockupData/user.service';
import { User } from 'src/app/shared/entities/user';

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

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {};

  formUser = new UntypedFormGroup({
    userId: new UntypedFormControl(''),
    userName: new UntypedFormControl('', [Validators.required]),
    userPassword: new UntypedFormControl('', [Validators.required]),
    confirmationPassword: new UntypedFormControl('', [Validators.required]),
    userRole: new UntypedFormControl('employee', [Validators.required]),
  })

  ngOnInit(): void {
    this.getUser();
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
    // This will subscribe to the only result returned from the observable (and thus unsubscribe)
    this.userList$ = this.userService.deleteUser(this.selectedUserId).pipe(
      mergeMap(() => this.userService.getUsers())
    );
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
    if(this.modeText == "Ajouter") {
      if(this.formUser.controls["userPassword"].value == this.formUser.controls["confirmationPassword"].value) {
        this.userService.postUser({
          id: parseInt(this.formUser.controls["userId"].value),
          username: this.formUser.controls["userName"].value,
          password: this.formUser.controls["userPassword"].value,
          role: this.formUser.controls["userRole"].value
        }).subscribe(data => console.log(data));
        this.getUser();
        this.cancel();      
        this.formUser.controls["userRole"].setValue('employee');
      } else {
        console.log("Mots de passe pas identiques");
      }
    } else if(this.modeText == "Modifier") {
      if(this.formUser.controls["userPassword"].value == this.formUser.controls["confirmationPassword"].value) {
        this.userService.putUser(this.selectedUserId, {
          id: this.formUser.controls["userId"].value,
          username: this.formUser.controls["userName"].value,
          password: this.formUser.controls["userPassword"].value,
          role: this.formUser.controls["userRole"].value
        }).subscribe(data => console.log(data));
        this.getUser();
        this.cancel();
        this.modeText = "Ajouter";      
        this.formUser.controls["userRole"].setValue('employee');
      } else {
        console.log("Mots de passe pas identiques");
      }
    }
  }

  protected cancel(): void {
    this.formUser.reset();
    this.modeText = "Ajouter";
    this.formUser.controls["userRole"].setValue('employee');
  }
}
