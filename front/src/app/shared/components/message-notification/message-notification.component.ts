import { Component, Input } from '@angular/core';

@Component({
  selector: 'message-notification',
  templateUrl: './message-notification.component.html',
  styleUrls: ['./message-notification.component.scss']
})
export class MessageNotificationComponent {
  
    @Input() message: String | undefined;

}
