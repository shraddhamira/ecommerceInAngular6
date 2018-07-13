import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
export class CategoryService {
    constructor(private http: HttpClient) { }

    getCategories() {
        return this.http.get('https://ecommerce-14fab.firebaseio.com/categories.json');
    }

    addCategory(data){
        return this.http.post('https://ecommerce-14fab.firebaseio.com/categories.json',data);
    }

    deleteCategory(key){
        return this.http.delete('https://ecommerce-14fab.firebaseio.com/categories/'+key+'.json');
    }
}