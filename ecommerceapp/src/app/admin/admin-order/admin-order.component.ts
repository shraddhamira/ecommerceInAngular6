import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../providers/order.service';
import { AuthService } from '../../providers/auth.service';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {

  items: any[] = [];
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private orderService: OrderService, private authService: AuthService,
    private afs: AngularFirestore, private db: AngularFireDatabase) {

  }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(
      (res) => {
        let jsonRecord = res.json();
        let keys = Object.keys(jsonRecord);
        this.items = keys.map(function (key) {
          return { key: key, data: jsonRecord[key] }
        })
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getProductDescription(selectedProducts: any) {
    let productDescription = "";
    for (let i = 0; i < selectedProducts.length; i++) {
      productDescription += selectedProducts[i].data.title + " "
    }
    return productDescription;
  }

}