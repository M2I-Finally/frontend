import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationStatusEnum } from './notification-status-enum';

@Component({
  selector: 'message-notification',
  templateUrl: './message-notification.component.html',
  styleUrls: ['./message-notification.component.scss']
})
export class MessageNotificationComponent {
  
    @Input() message: String | undefined;
    @Input() type: NotificationStatusEnum | undefined;
}
