import { Component, OnInit } from '@angular/core';
import { OrderService } from '../providers/order.service';
import { AuthService } from '../providers/auth.service';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  userDetails: any = {};
  items: any[] = [];

  constructor(private orderService: OrderService, private authService: AuthService,
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.authService.user$.subscribe(
      (res) => {
        let userDetails = res.toJSON();
        this.userDetails['id'] = userDetails['uid'];
        this.userDetails['email'] = userDetails['email'];
        this.orderService.getOrdersByUser(this.userDetails['id']).subscribe(
          (res) => {
            let jsonrecord = res.json();
            let keys = Object.keys(jsonrecord);
            this.items = keys.map(function (key) {
              return { key: key, data: jsonrecord[key] }
            })
          }
        );
      },
      (err) => { }
    );
  }

  getProductDescription(selectedProducts: any) {
    let productDescription = "";
    for (let i = 0; i < selectedProducts.length; i++) {
      productDescription += selectedProducts[i].data.title + " "
    }
    return productDescription;
  }

  getDeliveryStatus(deliveryStatus, orderStatus) {
    if(orderStatus=='Cancelled')
    return 'text-secondary';
    else if (deliveryStatus == 'Shipped' && orderStatus!='Cancelled')
      return 'text-primary';
    else if (deliveryStatus == 'Out for Delivery' && orderStatus!='Cancelled')
      return 'text-danger';
    else if (deliveryStatus == 'Delivered' && orderStatus!='Cancelled')
      return 'text-success';
    else if (deliveryStatus == 'Delivered' && orderStatus!='Cancelled')
      return 'text-success';
  }
}
