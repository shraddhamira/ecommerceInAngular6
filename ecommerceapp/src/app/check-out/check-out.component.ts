import { Component, OnInit } from '@angular/core';
import { CartService } from '../providers/cart.service';
import { ProductService } from '../providers/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../providers/order.service';
import { AuthService } from '../providers/auth.service';
import { throws } from 'assert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  shippingForm: FormGroup;
  paymentForm: FormGroup;
  userDetails: any = {};
  private cartData: any[];
  private productsData: any[];
  selectedProductsdata: any[];
  totalPrice: number = 0;
  constructor(private cartService: CartService, private productService: ProductService,
    private orderService: OrderService, private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.getCurrentCartDetails();
    this.authService.user$.subscribe(
      ((res) => {
        if (res) {
          let userDetails = res.toJSON();
          this.userDetails['id'] = userDetails['uid'];
          this.userDetails['email'] = userDetails['email'];
        } else {
          this.router.navigate(['login']);
        }
      })
    );

    this.shippingForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl(this.userDetails['email'], [Validators.required]),
      addressLine1: new FormControl('', [Validators.required]),
      addressLine2: new FormControl(''),
      country: new FormControl('IND'),
      contactNumber: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('MAH', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
      instruction: new FormControl('')
    });

    this.paymentForm = new FormGroup({
      cardHolderName: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required]),
      expiration: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required])
    });
  }

  getCurrentCartDetails() {
    this.cartService.getExistingProducts().subscribe((res) => {
      let jsonRecord = res.json();
      if (jsonRecord) {
        this.cartData = jsonRecord.items;
        this.getAllProductsData();
      } else {
        console.log("There are no items in your cart");
      }
    }, (err) => {
      console.log(err);
    })
  }

  getAllProductsData() {
    let selectedProductsArray = this.cartData;
    this.productService.getData().subscribe(
      (res) => {
        let jsonRecord = res.json();
        let keys = Object.keys(jsonRecord);
        this.productsData = keys.map(function (key) {
          return { key: key, data: jsonRecord[key] }
        });
        let totalPrice = this.totalPrice;
        this.selectedProductsdata = this.productsData.filter(product => {
          return selectedProductsArray.find(function (element) {
            product['data']['quantity'] = element.quantity;
            return element.product == product.key;
          });
        })

        this.totalPrice = this.productsData.filter(product => {
          return selectedProductsArray.find(element => {
            return element.product == product.key;
          });
        }).reduce((total, product)=> parseInt(total) + (parseInt(product.data.price) * parseInt(product.data.quantity)),0);
      },
      (err) => {

      }
    )
  }

  submitOrderDetails() {
    this.cartService.destroyCart().subscribe(
      (res) => {
        console.log("Cart Destroyed");
      },
      (err) => {
        console.error(err);
      }
    );
    let finalProducts: any[] = [];
    this.selectedProductsdata.forEach(function (product, index) {
      let productData = product['data'];
      let productKey = product['key'];
      product = productData;
      product['key'] = productKey;
      product['deliveryStatus'] = "In Progress";
      product['tentativeDeliveryDate'] = new Date().setDate(new Date().getDate() + 3);
      finalProducts.push(product);
    });
    this.orderService.addNewOrder(
      {
        uid: this.userDetails['id'],
        selectedProductsDetails: finalProducts,
        shippingDetails: this.shippingForm.value,
        paymentDetails: this.paymentForm.value,
        orderCreationDate: new Date(),
        orderStatus: 'In Progress',
        totalAmount: this.totalPrice,
        isPromoApplied: true,
        promocode: 'DUMMY50',
        trackingId: new Date().getTime()
      }).subscribe(
        (res) => {
          console.log("Order Placed Successfully");
          this.router.navigate(['my-orders']);
        },
        (error) => {
          console.error(error);
        }
      )
  }

  redeemPromo() { }

}