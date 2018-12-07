import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable, Subject } from "rxjs";
import { CustomNotification, NotificationType } from "../models/notiications.model";

@Injectable()
export class NotificationService {
    private subject = new Subject<CustomNotification>();



    pushMessage(msg: String, type : NotificationType) {
        let n: CustomNotification;
        n = new CustomNotification(msg, type);
        this.subject.next(n);
    }

    popMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}