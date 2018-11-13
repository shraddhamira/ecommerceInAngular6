import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<firebase.User>;
  loggedIn: boolean = false;
  loggedInUser: any = {};

  constructor(private _auth: AngularFireAuth) {
    console.log(this.user$);
    this.user$ = this._auth.authState;
  }

  login() {
    this.loggedIn = true;
    return this._auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  logout() {
    this.loggedIn = false;
    this.loggedInUser = {};
    this._auth.auth.signOut();
  }

  setLoggedIn(user: any) {
    this.loggedIn = true;
    this.loggedInUser = user;
  }

  isLoggedIn(){
    return this.loggedIn;
  }

  getLoggedInUser(){
    return this.loggedInUser;
  }
}
