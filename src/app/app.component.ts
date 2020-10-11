import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationBusService } from './services/notification-bus.service';
import { MessageService } from 'primeng/api';
import { Notification } from './models/notification';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'prueba-kenjo';
  message: Notification[] = [];
  sub: Subscription;

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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
