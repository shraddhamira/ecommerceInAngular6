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
  items: Observable<any[]>;
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private orderService: OrderService, private authService: AuthService,
    private afs: AngularFirestore) {

  }

  ngOnInit() {
    this.authService.user$.subscribe(
      (res) => {

        let userDetails = res.toJSON();
        this.userDetails['id'] = userDetails['uid'];
        this.userDetails['email'] = userDetails['email'];
        this.items=this.orderService.getOrdersByUser(this.userDetails['id']);
      },
      (err) => { }
    );
  }

  getProductDescription(selectedProducts : any){
    let productDescription = "";
    for(let i =0;i<selectedProducts.length;i++){
      productDescription+=selectedProducts[i].data.title+" "
    }
    return productDescription;
  }

}
