import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NotificationService } from '../providers/NotificationService';
import { Observable, Subscription } from 'rxjs';
import { CustomNotification, NotificationType } from '../models/notiications.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications : CustomNotification[] = []; 
  message : String;
  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() { 
    this.notificationService.popMessage().subscribe((cn : CustomNotification)=>{
      if(!cn){
        this.notifications=[];
      }
      this.notifications.push(cn);
      let me = this;
      setTimeout(function(){me.removeNotification(cn)},2500);
    });
  }

  removeNotification(cn : CustomNotification){
    this.notifications = this.notifications.filter(x => x !== cn);
  }

  getCssClass(cn : CustomNotification) {
    if (cn.getType() === NotificationType.Success)
      return 'text-success';
    else if (cn.getType() === NotificationType.Warn)
      return 'text-warn';
    else if (cn.getType() === NotificationType.Error)
      return 'text-danger';
    else if (cn.getType() === NotificationType.Info)
      return 'text-primary';
  }
}
