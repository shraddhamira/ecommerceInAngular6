import { Component, OnInit } from '@angular/core';
import { UserService } from '../../providers/user.service';
import { NotificationService } from '../../providers/NotificationService';
import { NotificationType } from '../../models/notiications.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  constructor(private userService: UserService, private notificationService : NotificationService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (res) => {
        let jsonRecord = res.json();
        let keys = Object.keys(jsonRecord);
        this.users = keys.map(function (key) {
          return { key: key, data: jsonRecord[key] }
        });
      },
      (err) => {
        this.notificationService.pushMessage("Error while fetching users", NotificationType.Error);
      }
    )
  }
}
