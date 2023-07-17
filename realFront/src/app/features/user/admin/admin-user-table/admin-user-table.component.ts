import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  userList: User[] | undefined;
  userList$: Observable<User[]> | undefined;
  selectedUser: User | undefined;
  selectedUserName: string | undefined;
  selectedUserId: number | undefined;

  constructor(private router: Router, private userService: UserService) {};

  formUser = new UntypedFormGroup({
    userId: new UntypedFormControl(''),
    userName: new UntypedFormControl('', [Validators.required]),
    userPassword: new UntypedFormControl('', [Validators.required]),
    confirmationPassword: new UntypedFormControl('', [Validators.required]),
    userRole: new UntypedFormControl(''),
  })

  ngOnInit(): void {
    this.userList$ = this.userService.getUsers();
    this.userService.getUsers()
      .subscribe({
        next: (res) => this.userList = res,
        error: (err) => console.log(err)
      });
  }

  protected goToPage(pageName:string): void {
    this.router.navigate([`${pageName}`])
  }

  protected deleteUser(): void {
    // This will subscribe to the only result returned from the observable (and thus unsubscribe)
    this.userList$ = this.userService.deleteUser(this.selectedUserId).pipe(
      mergeMap(() => this.userService.getUsers())
    );
  }

  protected onClick(event:Event): void {
    let userId: number = parseInt((event.currentTarget as HTMLInputElement).id);
    this.selectedUser = this.userList?.find(user => user.id === userId);
    this.selectedUserName = this.selectedUser?.username;
    this.selectedUserId = this.selectedUser?.id;
  }

  protected submit(): void {
    if(this.modeText == "Ajouter") {
      this.userService.postUser({
        id: parseInt(this.formUser.controls["userId"].value),
        username: this.formUser.controls["userName"].value,
        password: this.formUser.controls["userPassword"].value,
        role: this.formUser.controls["userRole"].value
      }).subscribe(data => console.log(data));
    } else {
      console.log("nope");
    }
  }
}
