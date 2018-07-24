import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreCollection, AngularFirestore } from "angularfire2/firestore";
import { map } from 'rxjs/operators';
import { environment } from "../../environments/environment";

@Injectable()
export class OrderService{
    private itemsCollection: AngularFirestoreCollection<any>;

    constructor(private http : Http,private afs: AngularFirestore){}

    addNewOrder(data){
        return this.http.post('https://ecommerce-14fab.firebaseio.com/orders.json',data);
    }

    getAllOrders(){
        return this.http.get('https://ecommerce-14fab.firebaseio.com/orders.json');
    }

    getOrdersByUser(userid){
        return this.http.get('https://ecommerce-14fab.firebaseio.com/orders.json?uid='+userid);
    }

    getOrder(orderId){
        return this.http.get('https://ecommerce-14fab.firebaseio.com/orders.json?key='+orderId);;
    }
}