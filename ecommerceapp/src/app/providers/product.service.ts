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

    getProductByKey(key){
        return this.http.get('https://ecommerce-14fab.firebaseio.com/products/'+key+'.json');
    }

    deleteProduct(key){
        return this.http.delete('https://ecommerce-14fab.firebaseio.com/products/'+key+'.json');
    }

    updateProduct(key,data){
        return this.http.put('https://ecommerce-14fab.firebaseio.com/products/'+key+'.json',data);
    }
}