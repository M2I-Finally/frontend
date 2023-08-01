import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'generic-header',
  templateUrl: './generic-header.component.html',
  styleUrls: ['./generic-header.component.scss']
})
export class GenericHeaderComponent {

  @Output() backHome = new EventEmitter();

  goHome(): void {
    console.log("retour accueil");
    this.backHome.emit();
  }
}
