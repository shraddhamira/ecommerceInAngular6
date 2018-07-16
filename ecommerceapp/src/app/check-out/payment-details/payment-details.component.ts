import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  @Input() form: FormGroup;
  @Output() submitForm = new EventEmitter<Object>();
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      cardHolderName: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required]),
      expiryMonth: new FormControl('', [Validators.required]),
      expiryYear: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required])
    });
  }

  submitPaymentForm(){
    this.submitForm.emit(this.form.value);
  }
}
