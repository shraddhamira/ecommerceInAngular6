import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

@Injectable()
export class OrderService{
    constructor(private http : Http){}

    addNewOrder(data){
        return this.http.post('https://ecommerce-14fab.firebaseio.com/orders.json',data);
    }

    getAllOrders(){
        return this.http.get('https://ecommerce-14fab.firebaseio.com/orders.json');
    }

    getOrdersByUser(userid){
        return this.http.get('https://ecommerce-14fab.firebaseio.com/orders/'+userid+'.json');
    }
}