import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Subject, Observable } from "rxjs";

@Injectable()
export class ProductService {
    private subject = new Subject<any>();
    constructor(private http: Http) {
        this.getData().subscribe((res)=>{
            let records = res.json();
            this.subject.next(records);
        });
    }

    getData() {
        return this.http.get('https://ecommerce-14fab.firebaseio.com/products.json');
    }

    getDataO(): Observable<any> {
        return this.subject.asObservable();
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