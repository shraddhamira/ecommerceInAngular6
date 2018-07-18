import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth'
import * as firebase from 'firebase';
import { AuthService } from '../providers/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth : AuthService, private router : Router) {}

  ngOnInit() {
    console.log(this.auth);
  }

  login() {
    let x = this.router
    this.auth.login().then(function(res){
      console.log(res);
      x.navigate(['home']);
    })
  }
}
