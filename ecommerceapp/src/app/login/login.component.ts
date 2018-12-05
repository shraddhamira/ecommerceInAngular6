import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase';
import { AuthService } from '../providers/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../providers/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  frm: FormGroup;
  user: any;
  constructor(private auth: AuthService, private router: Router, private userService: UserService) {
    this.frm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    console.log(this.auth);
  }

  login() {
    let x = this.router
    this.auth.login().then(function (res) {
      x.navigate(['products']);
    })
  }

  localLogin() {
    this.userService.getUser(this.frm.value['username']).subscribe(
      (res) => {
        let userDetails = res.json();
        let x = this.router;
        let auth = this.auth;
        let current = this;
        Object.keys(userDetails).forEach(key => {
          current.user = userDetails[key];
          if(current.user['password']==current.frm.value['password']){
            auth.setLoggedIn(current.user);
            x.navigate(['products']);
          }  
        });
        
      },
      (error) => {

      }
    )
  }
}
