import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../providers/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  frm: FormGroup;
  userKey : string;
  constructor(private userService : UserService, private router : Router) {
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
        this.router.navigate(['login']);
      }, (err) => {
        console.error(err);
      }
    );
  }

  updateUser(){
    this.userService.saveUser(this.frm.value).subscribe(
      (res) => {
        this.router.navigate(['login']);
      }, (err) => {
        console.error(err);
      }
    );
  }

}
