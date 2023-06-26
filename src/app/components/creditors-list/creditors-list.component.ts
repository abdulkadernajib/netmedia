import { Component, ViewChild } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { VoucherService } from 'src/app/services/voucher.service';
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component';

@Component({
  selector: 'app-creditors-list',
  template: `
  <div class="container">
    <app-toast-notification #toast></app-toast-notification>
    <div *ngIf="updateMaster" >
        <app-customer-master [customer]="creditor" [masterType]="masterType"
        (updateEvent)="onUpdate($event)" (cancelUpdateEvent)="cancelUpdate()">
        </app-customer-master>
    </div>
    <app-customer-list [parties]="creditors" [listType]="listType"
     (editEvent)="onEdit($event)" (deleteEvent)="onDelete($event)">
    </app-customer-list>
</div>
  `,
  styleUrls: ['./creditors-list.component.scss']
})
export class CreditorsListComponent {
  creditors;
  creditor: Customer;
  masterType;
  updateMaster: boolean = false
  listType: string = 'creditors'

  @ViewChild('toast') toast: ToastNotificationComponent;

  constructor(private voucherService: VoucherService) {

  }

  ngOnInit() {
    this.getCreditorList();
  }

  getCreditorList() {
    this.voucherService.getCreditor().subscribe(res => {
      this.creditors = res;
    })
  }

  onEdit(party) {
    this.updateMaster = true
    this.creditor = party
    this.masterType = `Updating ${this.creditor.businessName} | ${this.creditor.address.address}, ${this.creditor.address.city} `
  }
  onDelete(_id) {
    this.voucherService.deleteCreditor(_id).subscribe(res => {
      this.creditors = this.creditors.filter(c => c._id !== _id)
      this.toast.showToast(res.toString())
    })
  }

  onUpdate(creditor) {
    var _id = this.creditor._id
    this.voucherService.updateCreditor(_id, creditor.value).subscribe(res => {
      this.toast.showToast(res.toString());
      creditor.reset();
    })
    this.updateMaster = false
  }

  cancelUpdate() {
    this.updateMaster = false
  }

}
