import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NotificationService } from '../providers/NotificationService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  show : boolean = true;
  //listOfMessages :  Observable<String>;
  constructor(private notificationService : NotificationService) {
   }

  ngOnInit() {
    //this.listOfMessages = this.notificationService.popMessage();
    }

}
