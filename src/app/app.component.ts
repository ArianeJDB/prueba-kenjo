import { Component, OnInit } from '@angular/core';
import { NotificationBusService } from './notification-bus.service';
import { MessageService } from 'primeng/api';
import { Notification } from './notification';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  title = 'prueba-kenjo';
  message: Notification[] = [];

  constructor(
    private notificationsBus: NotificationBusService,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {
    this.notificationsBus.getNotification().subscribe(
      (notification: Notification) => {
        this.message = [];
        this.message.push(notification);
        this.addSingle();
      }
    );
  }
  addSingle() {
    this.message.map(msg => {
      this.messageService.add({
        severity: msg.severity,
        summary: msg.severity,
        detail: msg.detail
      });
    });
  }
}
