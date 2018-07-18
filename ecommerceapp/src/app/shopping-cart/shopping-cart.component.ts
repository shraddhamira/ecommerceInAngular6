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
  selectedProductsdata: any[];
  selectedProductsArray: any[];
  constructor(private cartService: CartService, private productService: ProductService) { }

  ngOnInit() {
    this.getCurrentCartDetails();
  }

  getCurrentCartDetails() {
    this.cartData = [];
    this.cartService.getExistingProducts().subscribe((res) => {
      let jsonRecord = res.json();
      if (jsonRecord) {
        let keys = Object.keys(jsonRecord);
        this.cartData = keys.map(function (key) {
          return { key: key, value: jsonRecord[key] }
        });
        this.getAllProductsData();
      } else {

      }
    }, (err) => {
      console.log(err);
    })
  }

  getAllCartProducts() {

  }

  removeFromCart(productKey) {
    this.selectedProductsArray.splice(this.selectedProductsArray.indexOf(productKey));
    this.cartService.removeFromCart(this.selectedProductsArray).subscribe(
      (res) => {
        this.getCurrentCartDetails();
      },
      (err) => {
        console.error(err);
      }
    );

  }

  getAllProductsData() {
    this.selectedProductsArray = this.cartData[0].value;
    if (!this.productsData) {
      this.productService.getData().subscribe(
        (res) => {
          let jsonRecord = res.json();
          if (jsonRecord) {
            let keys = Object.keys(jsonRecord);
            this.productsData = keys.map(function (key) {
              return { key: key, data: jsonRecord[key] }
            });

            this.selectedProductsdata = this.productsData.filter(product => {
              return this.selectedProductsArray.find(function (element) {
                return element == product.key;
              });
            });
          } else {
            console.log("There are no items in your cart");
          }
        },
        (err) => {

        }
      )
    } else {
      this.selectedProductsdata = this.productsData.filter(product => {
        return this.selectedProductsArray.find(function (element) {
          return element == product.key;
        });
      });
    }
  }

}
