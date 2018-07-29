import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../providers/order.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  editMode: boolean = false;
  orderKey: string;
  orderDetails: any = {};
  shippingForm: FormGroup;
  paymentForm: FormGroup;
  form: FormGroup;
  constructor(private routeParam: ActivatedRoute, private orderService: OrderService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = new FormGroup({
      orderCreationDate: new FormControl('', [Validators.required]),
      deliveryLocation: new FormControl('', [Validators.required]),
      orderStatus: new FormControl('', [Validators.required]),
      selectedProductsDetails: this.formBuilder.array([])
    })


    this.shippingForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
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

    this.routeParam.queryParamMap.subscribe(
      (res) => {
        this.orderKey = res.get('order');
        if (this.orderKey) {
          this.orderService.getOrder(this.orderKey).subscribe(
            (res) => {
              let jsonRecord = res.json();
              jsonRecord = jsonRecord[this.orderKey];
              let selectedProductsDetailsArray: any[] = [];
              var numberOfProducts = jsonRecord['selectedProductsDetails'] && jsonRecord['selectedProductsDetails'].length ? jsonRecord['selectedProductsDetails'].length : 0;
              for (var i = 0; i < numberOfProducts; i++) {
                this.addProductForm();
              }
              this.form.patchValue(jsonRecord);
              this.paymentForm.patchValue(jsonRecord['paymentDetails']);
              this.shippingForm.patchValue(jsonRecord['shippingDetails']);
              this.orderDetails = jsonRecord;
            }
          )
        }
      },
      (error) => {

      }
    );


  }

  createProductForm() {
    return this.formBuilder.group({
      title: [''],
      //price: ['', [Validators.required]],
      //imageUrl: ['', [Validators.required]],
      //quantity : ['', [Validators.required]],
      deliveryStatus: ['', [Validators.required]]
    })
  }

  addProductForm() {
    let control = this.form.get('selectedProductsDetails') as FormArray;
    control.push(this.createProductForm());
  }

  getDeliveryStatus(orderStatus) {
    if (orderStatus == 'Cancelled')
      return 'text-secondary';
    else if (orderStatus == 'Open')
      return 'text-danger';
    else if (orderStatus == 'Complete')
      return 'text-success';
    else if (orderStatus == 'In Progress')
      return 'text-warning';
  }

  getProductDeliveryStatus(deliveryStatus) {
    if (deliveryStatus == 'Shipped')
      return 'text-primary';
    else if (deliveryStatus == 'Out for Delivery')
      return 'text-danger';
    else if (deliveryStatus == 'In Progress')
      return 'text-warning';
    else if (deliveryStatus == 'Delivered')
      return 'text-success';
  }


  editOrder() {
    //open modal popup
  }
}
