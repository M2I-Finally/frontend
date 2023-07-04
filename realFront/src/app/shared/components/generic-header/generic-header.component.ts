import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'generic-header',
  templateUrl: './generic-header.component.html',
  styleUrls: ['./generic-header.component.scss']
})
export class GenericHeaderComponent {

  constructor(private router: Router) {}

  goToPage(pageName:string): void {
    this.router.navigate([`${pageName}`])
  }

}
