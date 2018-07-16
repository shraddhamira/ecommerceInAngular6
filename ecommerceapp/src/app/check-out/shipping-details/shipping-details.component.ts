import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css']
})
export class ShippingDetailsComponent implements OnInit {

  @Input() form: FormGroup;
  @Output() submitForm = new EventEmitter<Object>();

  @Input() tabref : NgbTabset;
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      addressLine1: new FormControl('', [Validators.required]),
      addressLine2: new FormControl(''),
      landmark: new FormControl(''),
      contactNumber: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zipcode: new FormControl('', [Validators.required])
    });
  }

  goToPaymentDetails(){
    this.tabref.select('tab-payment');
  }

  submitShippingDetails(){
    console.log("Shipping "+this.form.value);
    this.submitForm.emit(this.form.value);
    this.tabref.select('tab-payment');
  }
}
