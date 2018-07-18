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
  shippingDetails: any;
  paymentDetails: any;
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
        let userDetails = res.toJSON();
        this.userDetails['id'] = userDetails['uid'];
        this.userDetails['email'] = userDetails['email'];
      })
    );

    this.shippingForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email : new FormControl(this.userDetails['email'],[Validators.required]),
      addressLine1: new FormControl('', [Validators.required]),
      addressLine2: new FormControl(''),
      country: new FormControl('IND'),
      contactNumber: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('MAH', [Validators.required]),
      zip: new FormControl('', [Validators.required])
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
        let keys = Object.keys(jsonRecord);
        this.cartData = keys.map(function (key) {
          return { key: key, value: jsonRecord[key] }
        });
        this.getAllProductsData();
      } else {
        console.log("There are no items in your cart");
      }
    }, (err) => {
      console.log(err);
    })
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
        let totalPrice = this.totalPrice;
        this.selectedProductsdata = this.productsData.filter(product => {
          return selectedProductsArray.find(function (element) {
            totalPrice += product.data.price;
            return element == product.key;
          });
        })
      },
      (err) => {

      }
    )
  }

  retrieveShippingDetails(shippingDetails: Object) {
    this.shippingDetails = shippingDetails;
  }

  submitOrderDetails(paymentDetails: Object) {
    //this.paymentDetails = paymentDetails;
    this.cartService.destroyCart().subscribe(
      (res) => {
        console.log("Cart Destroyed");
      },
      (err) => {
        console.error(err);
      }
    );
    this.orderService.addNewOrder(
      {
        uid: this.userDetails['id'],
        selectedProductsDetails: this.selectedProductsdata,
        shippingDetails: this.shippingForm.value,
        paymentDetails: this.paymentForm.value,
        orderCreationDate: new Date()
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

  submitShippingForm() {
    this.shippingDetails = this.shippingForm.value;
  }

}