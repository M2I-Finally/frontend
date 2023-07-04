import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/mockupData/user.service';

@Component({
  selector: 'app-admin-user-table',
  templateUrl: './admin-user-table.component.html',
  styleUrls: ['./admin-user-table.component.scss']
})
export class AdminUserTableComponent implements OnInit {
  modeText: string = "Ajouter";

  constructor(private router: Router, private userService: UserService) {};

  formUser = new UntypedFormGroup({
    userId: new UntypedFormControl(''),
    userName: new UntypedFormControl(''),
    userPassword: new UntypedFormControl(''),
    confirmationPassword: new UntypedFormControl(''),
    userRole: new UntypedFormControl(''),
  })

  ngOnInit(): void {
    
  }

  goToPage(pageName:string): void {
    this.router.navigate([`${pageName}`])
  }
}
