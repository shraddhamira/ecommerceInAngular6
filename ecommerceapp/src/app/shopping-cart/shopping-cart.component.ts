import { Component, OnInit } from '@angular/core';
import { CartService } from '../providers/cart.service';
import { ProductService } from '../providers/product.service';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private cartData: any[];
  private productsData: any[];
  private selectedProductsdata: any[];
  constructor(private cartService: CartService, private productService: ProductService) { }

  ngOnInit() {
    this.getCurrentCartDetails();


  }

  getCurrentCartDetails() {
    this.cartService.getExistingProducts().subscribe((res) => {
      let jsonRecord = res.json();
      let keys = Object.keys(jsonRecord);
      this.cartData = keys.map(function (key) {
        return { key: key, value: jsonRecord[key] }
      });
      this.getAllProductsData();
    }, (err) => {
      console.log(err);
    })
  }

  getAllCartProducts() {

  }

  removeFromCart(productKey) {

  }

  getAllProductsData() {
    let selectedProductsArray = this.cartData[0].value;
    this.productService.getData().subscribe(
      (res) => {
        let jsonRecord = res.json();
        let keys = Object.keys(jsonRecord);
        this.productsData = keys.map(function (key) {
          return { key: key, data: jsonRecord[key] }
        });

        console.log('selected Products array', selectedProductsArray);
        this.selectedProductsdata = this.productsData.filter(product => {
          return selectedProductsArray.find(function (element) {
            return element == product.key;
          });
        })
      },
      (err) => {

      }
    )
  }

}
