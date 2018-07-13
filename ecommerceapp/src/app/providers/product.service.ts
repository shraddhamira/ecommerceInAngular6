import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

@Injectable()
export class ProductService {
    constructor(private http: Http) { }

    getData() {
        return this.http.get('https://ecommerce-14fab.firebaseio.com/products.json');
    }

    saveProduct(data:any){
        return this.http.post('https://ecommerce-14fab.firebaseio.com/products.json',data);
    }

}