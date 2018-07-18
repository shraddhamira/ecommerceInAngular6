import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<firebase.User>;

  constructor(private _auth: AngularFireAuth) { 
    console.log(this.user$);
    this.user$ = this._auth.authState;
  }

  login() {
    return this._auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  logout() {
    this._auth.auth.signOut();
  }
}
