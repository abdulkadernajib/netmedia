import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import { VoucherService } from 'src/app/services/voucher.service';
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component';

@Component({
  selector: 'app-customer-master',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.scss']
})
export class CustomerMasterComponent {

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
    closingBalance: null
  }
  cities: any[] = [];
  states: any[] = [];
  masterType: String;
  toastMessage;

  @ViewChild('toast') toast: ToastNotificationComponent;


  constructor(private voucherService: VoucherService) {

  }

  ngOnInit() {
    this.voucherService.getCities().subscribe(res => this.cities = res);
    this.voucherService.getStates().subscribe(res => this.states = res);


  }

  addDebtor(debtor: NgForm) {
    this.voucherService.addDebtor(debtor.value).subscribe(res => { });
    this.toast.showToast('Debtor added successfully')
  }

}
