import { Component, OnInit } from '@angular/core';
import { CartService } from '../providers/cart.service';
import { ProductService } from '../providers/product.service';
import { NotificationService } from '../providers/NotificationService';
import { NotificationType } from '../models/notiications.model';
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
  constructor(private cartService: CartService, private productService: ProductService, 
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.getCurrentCartDetails();
  }

  getCurrentCartDetails() {
    this.cartData = [];
    this.cartService.getExistingProducts().subscribe((res) => {
      let jsonRecord = res.json();
      if (jsonRecord) {
        let keys = Object.keys(jsonRecord);
        this.cartData = jsonRecord['items'];
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

  increaseQuantity(productKey, productIndex) {
    this.cartService.increaseQuantity(productKey);
    this.selectedProductsdata.forEach((product, index) => {
      if (product['data'].quantity <= 10 && index == productIndex) {
        product['data'].quantity += 1;
      } else {
        this.notificationService.pushMessage("One user cannot order more than 10 quantity in one Order", NotificationType.Error);
      }
    })
    //this.getCurrentCartDetails();
  }

  decreaseQuantity(productKey, productIndex) {
    this.cartService.decreaseQuantity(productKey);
    this.selectedProductsdata.forEach((product, index) => {
      if (index == productIndex) {
        product['data'].quantity -= 1;
      }
    })
  }

  getAllProductsData() {
    this.selectedProductsArray = this.cartData;
    if (!this.productsData) {
      this.productService.getData().subscribe(
        (res) => {
          let jsonRecord = res.json();
          if (jsonRecord) {
            let keys = Object.keys(jsonRecord);
            this.productsData = keys.map(function (key) {
              return { key: key, data: jsonRecord[key] }
            });
            let selectedProductsArray = this.selectedProductsArray;
            this.selectedProductsdata = this.productsData.filter(product => {
              return selectedProductsArray.find(function (element) {
                product.data['quantity'] = element['quantity'];
                return element.product == product.key;
              })
            });
          } else {
            this.notificationService.pushMessage("There are not items in your cart", NotificationType.Info);
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
