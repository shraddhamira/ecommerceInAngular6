import { Injectable } from "@angular/core";
import { Http } from "@angular/http";


@Injectable()
export class UserService {
    constructor(private http: Http) { }

    saveUser(data : any){
        return this.http.post('https://ecommerce-14fab.firebaseio.com/users.json',data);
    }

    updateUser(id, data){
        return this.http.put('https://ecommerce-14fab.firebaseio.com/users/'+id+'.json',data);
    }

    deleteUser(id){
        return this.http.delete('https://ecommerce-14fab.firebaseio.com/users/'+id+'.json');
    }

    getUser(userName: string){
        return this.http.get('https://ecommerce-14fab.firebaseio.com/users.json?username='+userName);
    }

    getUserById(id){
        return this.http.get('https://ecommerce-14fab.firebaseio.com/users/'+id+'.json');
    }

    getAllUsers(){
        return this.http.get('https://ecommerce-14fab.firebaseio.com/users.json');
    }
}