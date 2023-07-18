import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent {  
  constructor(private router: Router) {};

  goToPage(pageName:string): void {
    this.router.navigate([`${pageName}`])
  }
}
