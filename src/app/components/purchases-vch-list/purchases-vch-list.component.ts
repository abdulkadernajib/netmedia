import { Component } from '@angular/core';
import { forkJoin, map, mergeMap } from 'rxjs';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-purchases-vch-list',
  template: `
  <div class="container">
    <app-voucher-list [invoices]="invoices" [listType]="listType">
    </app-voucher-list>
  </div>
  `,
  styles: [
  ]
})
export class PurchasesVchListComponent {
  invoices
  listType: string = 'purchases'

  constructor(public voucherService: VoucherService) {
  }

  ngOnInit() {
    this.getSalesList()
  }

  getSalesList() {
    this.voucherService.getPurchases().pipe
      (mergeMap((purchases) => {
        const request = purchases.map((cx) => this.voucherService.getCreditorByID(cx.creditor))
        return forkJoin(request).pipe(
          map((cxArray: any) => {
            return purchases.map((s, index) => ({
              _id: s._id,
              voucherNo: s.voucherNo,
              invoiceNo: s.invoiceNo,
              date: s.date,
              netTotal: s.total + s.cgst + s.sgst + s.igst,
              name: cxArray[index].businessName
            }))
          }
          ))
      }))
      .subscribe((res: any) => {
        this.invoices = res
      })
  }
}

