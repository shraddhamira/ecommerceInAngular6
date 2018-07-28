import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AuthService } from '../providers/auth.service';
import { CartService } from '../providers/cart.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  constructor(public auth: AuthService, private cartService: CartService) { }
  cartData: any[];
  toggleMenu: boolean;
  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

  getCurrentCartDetails() {
    this.cartData = [];
    this.cartService.getExistingProducts().subscribe((res) => {
      let jsonRecord = res.json();
      if (jsonRecord) {
        let keys = Object.keys(jsonRecord);
        this.cartData = keys.map(function (key) {
          return { key: key, value: jsonRecord[key] }
        });
        // this.getAllProductsData();
      } else {

      }
    }, (err) => {
      console.log(err);
    })
  }

  toggleMenubar() {
    if (this.toggleMenu)
      this.toggleMenu = false;
    else
      this.toggleMenu = true;
  }
}
