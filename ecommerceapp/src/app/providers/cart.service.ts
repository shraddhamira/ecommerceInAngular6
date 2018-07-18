import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class CartService {
    constructor(private http: Http) { }

    addToExistingCart(cartId, product) {
        this.getExistingProducts().subscribe((res) => {
            let jsonRecord = res.json();
            if (jsonRecord) {
                jsonRecord.items.push(product);
            } else {
                jsonRecord = {};
                jsonRecord.items = [];
                jsonRecord.items.push(product);
            }
            this.http.put('https://ecommerce-14fab.firebaseio.com/shoppingcarts/' + cartId + '.json',
                { items: jsonRecord.items }).subscribe();
        }, (err) => {
            console.log(err);
        })

    }

    createCart(cartId, product) {
        return this.http.post('https://ecommerce-14fab.firebaseio.com/shoppingcarts.json', {
            items: [product]
        });
    }

    getCart(product) {
        let cartId = new Date().getTime().toString();
        this.createCart(cartId, product).subscribe(
            (res) => {
                let response = res.json();
                localStorage.setItem('cartId', response['name']);
                return cartId;
            },
            (err) => {
                console.error(err);
            }
        );
    }

    addToCart(product) {
        let cartId = this.getExistingCartId();
        if (!cartId) {
            this.getCart(product);
        } else {
            this.addToExistingCart(cartId, product);
        }
    }

    getExistingCartId() {
        return localStorage.getItem('cartId');
    }

    getExistingProducts() {
        let cartId = this.getExistingCartId();
        return this.http.get('https://ecommerce-14fab.firebaseio.com/shoppingcarts/' + cartId + '.json')
    }

    removeFromCart(products) {
        let cartId = this.getExistingCartId();
        return this.http.put('https://ecommerce-14fab.firebaseio.com/shoppingcarts/' + cartId + '.json',{
            items : products
        });
    }

    destroyCart() {
        let cartId = this.getExistingCartId();
        localStorage.removeItem(cartId);
        return this.http.delete('https://ecommerce-14fab.firebaseio.com/shoppingcarts/' + cartId + '.json')
    }
}