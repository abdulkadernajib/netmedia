import { Component, EventEmitter, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import { VoucherService } from 'src/app/services/voucher.service';
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-debtor-master',
  template: `
  <div class="container">
    <app-toast-notification #toast></app-toast-notification>
    <app-customer-master [masterType]="masterType"  [customer]="customer" 
    (submitForm)="onSubmit($event)">
    </app-customer-master>
  </div>
  `,
  styleUrls: ['./debtor-master.component.scss']
})
export class DebtorMasterComponent {

  masterType: string = 'Debtor Master'

  @ViewChild('toast') toast: ToastNotificationComponent;

  customer: Customer = {
    businessName: '',
    phone: '',
    phone2: '',
    email: '',
    contactPerson: '',
    address: {
      address: '',
      city: '',
      state: '',
      pinCode: null,
    },
    bankDetails: {
      accountNo: null,
      bankName: '',
      ifsc: '',
      branch: ''
    },
    compliance: {
      gstNo: '',
      gstType: '',
      panNo: ''
    },
    closingBalance: null,
  }
  headers

  constructor(private voucherService: VoucherService) {

  }

  ngOnInit() {
    this.headers = new HttpHeaders(this.voucherService.headers)
  }

  onSubmit(form: NgForm) {
    this.voucherService.verifyGstin(this.customer.compliance.gstNo, this.headers).subscribe(res => {
      console.log(res)
    })

    // this.voucherService.addDebtor(form.value).subscribe(res => {
    //   this.toast.showToast(res.toString());
    //   form.reset();
    // })
  }
}

