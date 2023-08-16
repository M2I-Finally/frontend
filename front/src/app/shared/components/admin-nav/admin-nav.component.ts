import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { Jwt } from 'src/app/shared/entities/jwt';

@Component({
  selector: 'admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent {  
  constructor(private router: Router) {};

  // By default we assume that it is a manager, so we don't show user button by error
  protected isAdmin: boolean = false;

  ngOnInit(): void {
    let sessionToken = sessionStorage.getItem('token');
    if(sessionToken != undefined) {
      let decoded: Jwt = jwt_decode(sessionToken);
      if( decoded.role == 'ADMIN' ) {
        this.isAdmin = true;
      }
    }
  }

  goToPage(pageName:string): void {
    this.router.navigate([`${pageName}`])
  }
}
