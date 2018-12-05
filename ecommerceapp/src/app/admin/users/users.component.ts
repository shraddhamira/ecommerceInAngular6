import { Component, OnInit } from '@angular/core';
import { UserService } from '../../providers/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (res) => {
        let jsonRecord = res.json();
        console.log(jsonRecord);
        let keys = Object.keys(jsonRecord);
        this.users = keys.map(function (key) {
          return { key: key, data: jsonRecord[key] }
        });
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
