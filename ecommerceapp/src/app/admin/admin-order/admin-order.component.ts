import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../providers/order.service';
import { AuthService } from '../../providers/auth.service';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { NotificationService } from '../../providers/NotificationService';
import { NotificationType } from '../../models/notiications.model';


@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {

  items: any[] = [];
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private orderService: OrderService, private authService: AuthService,
    private afs: AngularFirestore, private db: AngularFireDatabase, private notificationService : NotificationService) {

  }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(
      (res) => {
        let jsonRecord = res.json();
        if (jsonRecord) {
          let keys = Object.keys(jsonRecord);
          this.items = keys.map(function (key) {
            return { key: key, data: jsonRecord[key] }
          })
        }
      },
      (err) => {
        this.notificationService.pushMessage("Error occurred while fetching orders",NotificationType.Error);
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
  getDeliveryStatus(deliveryStatus, orderStatus) {
    if (orderStatus == 'Cancelled')
      return 'text-secondary';
    else if (deliveryStatus == 'Shipped' && orderStatus != 'Cancelled')
      return 'text-primary';
    else if (deliveryStatus == 'Out for Delivery' && orderStatus != 'Cancelled')
      return 'text-danger';
    else if (deliveryStatus == 'Delivered' && orderStatus != 'Cancelled')
      return 'text-success';
    else if (deliveryStatus == 'In Progress' && orderStatus != 'Cancelled')
      return 'text-warning';
  }
}