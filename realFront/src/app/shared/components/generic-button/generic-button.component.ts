import { Component, Input } from '@angular/core';

@Component({
  selector: 'generic-button',
  templateUrl: './generic-button.component.html',
  styleUrls: ['./generic-button.component.scss']
})
export class GenericButtonComponent {
  @Input() color: string | undefined;
  @Input() content: string | undefined;
  @Input() isDisabled: boolean = false;
}
