import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

@Injectable()
export class NotificationService {
    public listOfMessages: Observable<String>;

    pushMessage(msg: string) {
        this.listOfMessages = new Observable<String>(
            obs=>{
                obs.next(msg);
            }
        );
    }

    getAllMessages() {
        return this.listOfMessages;
    }

    popMessage() {
        return this.listOfMessages;
    }
}