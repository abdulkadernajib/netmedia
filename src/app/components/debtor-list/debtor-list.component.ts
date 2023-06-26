import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import { VoucherService } from 'src/app/services/voucher.service';
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component';

@Component({
  selector: 'app-debtor-list',
  template: `
  <div class="container">
    <app-toast-notification #toast></app-toast-notification>
    <div *ngIf="updateMaster" >
      <app-customer-master [customer]="debtor" [masterType]="masterType"
      (updateEvent)="onUpdate($event)" (cancelUpdateEvent)="cancelUpdate()">
      </app-customer-master>
    </div>
    <app-customer-list [parties]="debtors" [listType]="listType"
    (editEvent)="onEdit($event)" (deleteEvent)="onDelete($event)">
    </app-customer-list>
  </div>
  `,
  styleUrls: ['./debtor-list.component.scss']
})
export class DebtorListComponent {

  debtors;
  debtor: Customer;
  masterType;
  updateMaster: boolean = false
  listType: string = 'debtors'

  @ViewChild('toast') toast: ToastNotificationComponent;

  constructor(private voucherService: VoucherService) {

  }

  ngOnInit() {
    this.getDebtorList();
  }

  getDebtorList() {
    this.voucherService.getDebtor().subscribe(res => {
      this.debtors = res;
    })
  }

  onEdit(party) {
    this.updateMaster = true
    this.debtor = party
    this.masterType = `Updating ${this.debtor.businessName} | ${this.debtor.address.address}, ${this.debtor.address.city} `
  }
  onDelete(_id) {
    this.voucherService.deleteDebtor(_id).subscribe(res => {
      this.debtors = this.debtors.filter(d => d._id !== _id)
      this.toast.showToast(res.toString())
    })
  }

  onUpdate(debtor) {
    var _id = this.debtor._id
    this.voucherService.updateDebtor(_id, debtor.value).subscribe(res => {
      this.toast.showToast(res.toString());
      debtor.reset();
    })
    this.updateMaster = false
  }

  cancelUpdate() {
    this.updateMaster = false
  }


}
