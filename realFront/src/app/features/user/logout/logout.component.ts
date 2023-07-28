import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  providers: [DatePipe]
})
export class LogoutComponent {
  currentDate: Date = new Date();

  constructor(private router: Router, private authService : AuthService) {}

  logout():void{
    this.authService.logout();
    this.router.navigateByUrl('/')
  }

  

  goToPage(pageName:string): void {
    this.router.navigate([`${pageName}`])
  }
}
