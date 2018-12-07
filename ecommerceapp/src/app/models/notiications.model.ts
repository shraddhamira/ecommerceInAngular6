export class CustomNotification {
    private message: String;
    private type: NotificationType;
     setMessage(message){
         this.message=message;
     }
 
     getMessage(){
         return this.message;
     }
 
     setType(type : NotificationType){
         this.type=type;
     }

     getType() : NotificationType {
         return this.type;
     }
 
    constructor(msg: String, type: NotificationType) {
        this.message = msg;
        this.type = type;
    }
}
export enum NotificationType{
    Success,
    Warn,
    Error,
    Info
}