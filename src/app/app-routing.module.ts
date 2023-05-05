import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductMasterComponent } from './components/product-master/product-master.component';
import { PurchaseVoucherComponent } from './components/purchase-voucher/purchase-voucher.component';
import { SalesVoucherComponent } from './components/sales-voucher/sales-voucher.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CustomerMasterComponent } from './components/customer-master/customer-master.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'mobiles/new', component: ProductMasterComponent },
  { path: 'voucher/purchases/new', component: PurchaseVoucherComponent },
  { path: 'voucher/sales/new', component: SalesVoucherComponent },
  { path: 'masters/customers/new', component: CustomerMasterComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
