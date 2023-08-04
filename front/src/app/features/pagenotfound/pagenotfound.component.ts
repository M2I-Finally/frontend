import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PagenotfoundComponent {
  constructor( private router: Router, private location: Location) {}
  
  goToPage(pageName:string): void {
    this.router.navigate([`${pageName}`])
  }

  previousPage(){
    this.location.back();
  }
}
