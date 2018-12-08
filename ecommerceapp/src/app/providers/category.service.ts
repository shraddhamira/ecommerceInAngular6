import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Category } from "../models/category.model";
@Injectable()
export class CategoryService {
    private subject = new Subject<any>();
    constructor(private http: Http) { 
        this.getCategories().subscribe((res)=>{
            let records = res.json();
            this.subject.next(records);
        })
    }

    getCategories() {
        return this.http.get('https://ecommerce-14fab.firebaseio.com/categories.json');
    }

    getCategoriesO() : Observable<any>{
        return this.subject.asObservable();
    }

    extractData(res : Response){
        let body = res.json();
        return body;
    } 

    addCategory(data) {
        return this.http.post('https://ecommerce-14fab.firebaseio.com/categories.json', data);
    }

    deleteCategory(key) {
        return this.http.delete('https://ecommerce-14fab.firebaseio.com/categories/' + key + '.json');
    }

    updateCategory(key, data) {
        return this.http.put('https://ecommerce-14fab.firebaseio.com/categories/' + key + '.json', data);
    }
}