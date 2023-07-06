import { Component } from '@angular/core';
import { VoucherService } from 'src/app/services/voucher.service';
import { mergeMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sales-vch-list',
  template: `
  <div class="container">
    <app-voucher-list [invoices]="invoices" [listType]="listType">
    </app-voucher-list>
  </div>
  `,
  styles: [
  ]
})
export class SalesVchListComponent {
  invoices
  listType: string = 'sales'

  constructor(public voucherService: VoucherService) {
  }

  ngOnInit() {
    this.getSalesList()
  }

  getSalesList() {
    this.voucherService.getSales().pipe
      (mergeMap((sales) => {
        const request = sales.map((cx) => this.voucherService.getDebtorByID(cx.debtor))
        return forkJoin(request).pipe(
          map((cxArray: any) => {
            return sales.map((s, index) => ({
              _id: s._id,
              voucherNo: s.voucherNo,
              invoiceNo: s.invoiceNo,
              date: s.date,
              netTotal: s.total + s.cgst + s.sgst + s.igst,
              name: cxArray[index].debtor.businessName
            }))
          }
          ))
      }))
      .subscribe((res: any) => {
        this.invoices = res
      })
  }


}



