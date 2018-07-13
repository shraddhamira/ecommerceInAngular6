import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth'
import * as firebase from 'firebase';
import { AuthService } from '../providers/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth : AuthService) {}

  ngOnInit() {
    console.log(this.auth);
  }

  login() {
    this.auth.login();
  }
}
