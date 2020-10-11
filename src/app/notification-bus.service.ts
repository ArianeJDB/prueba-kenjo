import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Notification } from './notification';
@Injectable({
  providedIn: 'root'
})
export class NotificationBusService {

  showNotificationSource: ReplaySubject<Notification>;
  constructor() {
    this.showNotificationSource = new ReplaySubject<Notification>();
  }

  getNotification(): Observable<Notification> {
    return this.showNotificationSource.asObservable();
    }

    showError(msg: string, summary?: string) {
      this.show('error', summary, msg);
    }
  
    showSuccess(msg: string, summary?: string) {
      this.show('success', summary, msg);
    }
    showInfo(msg: string, summary?: string) {
      this.show('info', summary, msg);
    }
    showWarn(msg: string, summary?: string) {
      this.show('warn', summary, msg);
    }
    private show(severity: string, summary: string, msg: string) {
      const notification: Notification = {
        severity,
        summary,
        detail: msg
      };
      this.notify(notification);
    }
    private notify(notification: Notification): void {
      this.showNotificationSource.next(notification);
    }
}
