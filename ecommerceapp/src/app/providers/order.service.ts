import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class OrderService{
    constructor(private http : Http, private db : AngularFireDatabase){}

    addNewOrder(data){
        return this.http.post('https://ecommerce-14fab.firebaseio.com/orders.json',data);
    }

    getAllOrders(){
        return this.http.get('https://ecommerce-14fab.firebaseio.com/orders.json');
    }

    getOrdersByUser(userid){
        return this.db.list("orders",ref => ref.orderByChild('uid').equalTo(userid)).valueChanges();
        //,ref => ref.orderByChild('uid').equalTo(userid)
        //return this.http.get('https://ecommerce-14fab.firebaseio.com/orders.json?orderBy="uid"');
    }
}