import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../providers/order.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  editMode: boolean = false;
  orderKey: string;
  orderDetails: any = {};
  productForm: FormGroup;
  shippingForm: FormGroup;
  paymentForm: FormGroup;
  form: FormGroup;
  closeResult: string;
  constructor(private routeParam: ActivatedRoute, private orderService: OrderService,
    private formBuilder: FormBuilder, private modalService: NgbModal) { }

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
          this.setOrderData();
        }
      },
      (error) => {

      }
    );
  }
  setOrderData() {
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

  createProductPopup() {
    this.productForm = new FormGroup({
      deliveryDateAndTime: new FormControl(new Date(), []),
      deliveryStatus: new FormControl('', [Validators.required])
    });
  }

  createProductForm() {
    return this.formBuilder.group({
      title: [''],
      deliveryDateAndTime: [new Date()],
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  editDeliveryStatus(content, product) {
    console.log(product);
    this.productForm = new FormGroup({
      deliveryDate: new FormControl('', []),
      deliveryStatus: new FormControl('', [Validators.required])
    });
    this.productForm.patchValue({
      deliveryStatus: product.deliveryStatus,
      deliveryDate: { year: new Date().getFullYear(), day: new Date().getDate(), month: new Date().getMonth() }
    })
    this.modalService.open(content, {}).result.then((result) => {
      this.updateDeliveryStatus(product);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  updateDeliveryStatus(editedProduct) {
    this.orderDetails.selectedProductsDetails.forEach(product => {
      if (product['key'] == editedProduct['key']) {
        product['deliveryStatus'] = this.productForm.get('deliveryStatus').value;
        product['deliveryDate'] = this.productForm.get('deliveryDate').value;
        this.orderService.updateOrder(this.orderKey, this.orderDetails).subscribe(
          (res) => {
            console.log("Order updated");
            this.setOrderData();
          },
          (err) => {
            console.error("Order was not able to update");
          }
        )
      }

    });
  }
}
