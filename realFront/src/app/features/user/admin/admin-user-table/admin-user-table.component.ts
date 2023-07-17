import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
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
    userName: new UntypedFormControl(''),
    userPassword: new UntypedFormControl(''),
    confirmationPassword: new UntypedFormControl(''),
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

  goToPage(pageName:string): void {
    this.router.navigate([`${pageName}`])
  }

  protected deleteUser(): void {
    // This will subscribe to the only result returned from the observable (and thus unsubscribe)
    this.userList$ = this.userService.deleteUser(this.selectedUserId).pipe(
      mergeMap(() => this.userService.getUsers())
    );
  }

  onClick(event:Event): void {
    let userId: number = parseInt((event.currentTarget as HTMLInputElement).id);
    this.selectedUser = this.userList?.find(user => user.id === userId);
    this.selectedUserName = this.selectedUser?.username;
    this.selectedUserId = this.selectedUser?.id;
  }
}
