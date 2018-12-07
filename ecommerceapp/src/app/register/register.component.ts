import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../providers/user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../providers/notification.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  frm: FormGroup;
  userKey : string;
  constructor(private userService : UserService, private router : Router, private notificationService : NotificationService) {
    this.frm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      retypePassword: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required])
    });
   }

  ngOnInit() {
  }

  saveUser(){
    this.userService.saveUser(this.frm.value).subscribe(
      (res) => {
        this.notiicationService.pushMessage("User registration successful. Please login with your credintials.",NotificationType.Info);
        this.router.navigate(['login']);
      }, (err) => {
        this.notiicationService.pushMessage("User registration was failed due to technical issue. Please contact administrator.",NotificationType.Error);
      }
    );
  }

  updateUser(){
    this.userService.saveUser(this.frm.value).subscribe(
      (res) => {
        this.router.navigate(['login']);
      }, (err) => {
        this.notiicationService.pushMessage("User registration was failed due to technical issue. Please contact administrator.",NotificationType.Error);
      }
    );
  }

}
