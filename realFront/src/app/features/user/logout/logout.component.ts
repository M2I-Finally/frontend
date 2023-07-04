import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  providers: [DatePipe]
})
export class LogoutComponent {
  currentDate: Date = new Date();

  constructor(private router: Router) {}

  goToPage(pageName:string): void {
    this.router.navigate([`${pageName}`])
  }
}
