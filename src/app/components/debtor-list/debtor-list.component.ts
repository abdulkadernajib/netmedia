import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import { VoucherService } from 'src/app/services/voucher.service';
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component';
import { forkJoin, map, mergeMap } from 'rxjs';

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
    <app-customer-list [parties]="debtors" [listType]="listType" [selectedId]="selectedId" 
    [outstandings]="outstandings"
    (editEvent)="onEdit($event)" (deleteEvent)="onDelete()" (modalEvent)="showDeleteModal($event)"
    (closeModalEvent)="closeModal()">
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
  selectedId: string
  outstandings = "Recievables"

  @ViewChild('toast') toast: ToastNotificationComponent;

  constructor(private voucherService: VoucherService) {

  }

  ngOnInit() {
    this.getDebtorList();
  }

  getDebtorList() {
    this.voucherService.getDebtor().pipe(
      mergeMap((creditorsArray: any[]) => {
        const requests = this.voucherService.getSales()
        let result

        return forkJoin(requests).pipe(
          map((purchasesArray: any[]) => {

            let outstandings






            return creditorsArray.map(s => ({
              ...s,
              purchaseCount: purchasesArray[0].filter((x) => x.debtor === s._id).length,
              outstandings: (purchasesArray[0].filter((x) => x.debtor === s._id).map(
                item => item.total + item.sgst + item.cgst + item.igst))[0]
            })

            )
          })
        )
      }))
      .subscribe(res => {
        console.log(res);

        this.debtors = res;
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
    this.debtor = party
    this.masterType = `Updating ${this.debtor.businessName} | ${this.debtor.address.address}, ${this.debtor.address.city} `
  }
  onDelete() {
    let _id = this.selectedId
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
