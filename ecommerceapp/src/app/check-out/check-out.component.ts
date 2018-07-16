import { Component, OnInit } from '@angular/core';
import { CartService } from '../providers/cart.service';
import { ProductService } from '../providers/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../providers/order.service';
import { AuthService } from '../providers/auth.service';
import { throws } from 'assert';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  shippingForm: FormGroup;
  paymentForm: FormGroup;
  shippingDetails : any ;
  paymentDetails : any;
  userDetails : any = {};
  private cartData: any[];
  private productsData: any[];
  selectedProductsdata: any[];
  constructor(private cartService: CartService, private productService: ProductService,
    private orderService: OrderService, private authService: AuthService) { }

  ngOnInit() {
    this.getCurrentCartDetails();
    this.authService.user$.subscribe(
      ((res)=>{
        let userDetails = res.toJSON();
        this.userDetails['id'] = userDetails['uid'];
        this.userDetails['email'] = userDetails['email'];
      })
    );
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

  retrieveShippingDetails(shippingDetails: Object) {
    this.shippingDetails = shippingDetails;
  }

  retrievePaymentDetails(paymentDetails: Object) {
    this.paymentDetails = paymentDetails;
    this.cartService.destroyCart().subscribe(
      (res)=>{
        console.log("Cart Destroyed");
      },
      (err)=>{
        console.error(err);
      }
    );
    this.orderService.addNewOrder(
      {
        uid : this.userDetails['id'], 
        selectedProductsDetails : this.selectedProductsdata,
        shippingDetails : this.shippingDetails,
        paymentDetails : this.paymentDetails
      }).subscribe(
        (res)=>{
          console.log("Order Placed Successfully");
        },
        (error)=>{
          console.error(error);
        }
      )
  }

  submitShippingForm(){
    this.shippingDetails = this.shippingForm.value;
  }

}