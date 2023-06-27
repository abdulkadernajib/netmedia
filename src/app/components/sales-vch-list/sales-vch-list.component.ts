import { Component } from '@angular/core';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-sales-vch-list',
  template: `
  <div class="container">
    <app-voucher-list [invoices]="invoices" [listType]="listType"></app-voucher-list>
  </div>
  `,
  styles: [
  ]
})
export class SalesVchListComponent {
  invoices;
  listType: string = 'sales'

  constructor(public voucherService: VoucherService) {
  }

  ngOnInit() {
    this.getSalesList()
  }

  getSalesList() {
    this.voucherService.getSales().subscribe(res => {
      console.log(res);
      this.invoices = res

    })

  }


}



