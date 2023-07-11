import { Component, ViewChild } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { VoucherService } from 'src/app/services/voucher.service';
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component';
import { forkJoin, mergeMap, map } from 'rxjs';

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
    <app-customer-list [parties]="creditors" [listType]="listType" [selectedId]="selectedId"
    [outstandings]="outstandings"
     (editEvent)="onEdit($event)" (deleteEvent)="onDelete()" (modalEvent)="showDeleteModal($event)"
    (closeModalEvent)="closeModal()">
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
  selectedId: string
  outstandings: string = 'Payables'

  @ViewChild('toast') toast: ToastNotificationComponent;

  constructor(private voucherService: VoucherService) {

  }

  ngOnInit() {
    this.getCreditorList();
  }

  getCreditorList() {
    this.voucherService.getCreditor().pipe(
      mergeMap((creditorsArray: any[]) => {
        const requests = this.voucherService.getPurchases()

        return forkJoin(requests).pipe(
          map((purchasesArray: any[]) => {

            return creditorsArray.map(s => ({
              ...s,
              purchaseCount: purchasesArray[0].filter((x) => x.creditor === s._id).length,
              outstandings: (purchasesArray[0].filter((x) => x.creditor === s._id).map(
                item => item.total + item.sgst + item.cgst + item.igst))[0]
            }))
          })
        )
      }))
      .subscribe(res => {
        this.creditors = res;
      })
  }

  showDeleteModal(_id) {
    const modalDiv = document.getElementById('deleteWarning')
    if (modalDiv != null) {
      modalDiv.style.display = 'block'
      this.selectedId = _id
    }
  }

  closeModal() {
    const deleteModal = document.getElementById('deleteWarning')
    if (deleteModal != null) {
      deleteModal.style.display = 'none'
      this.selectedId = ''
    }
  }

  onEdit(party) {
    this.updateMaster = true
    this.creditor = party
    this.masterType = `Updating ${this.creditor.businessName} | ${this.creditor.address.address}, ${this.creditor.address.city} `
  }
  onDelete() {
    let _id = this.selectedId
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
