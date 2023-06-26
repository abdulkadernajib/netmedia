import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductMasterComponent } from './components/product-master/product-master.component';
import { PurchaseVoucherComponent } from './components/purchase-voucher/purchase-voucher.component';
import { SalesVoucherComponent } from './components/sales-voucher/sales-voucher.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DebtorMasterComponent } from './components/debtor-master/debtor-master.component';
import { CreditorMasterComponent } from './components/creditor-master/creditor-master.component';
import { DebtorListComponent } from './components/debtor-list/debtor-list.component';
import { CreditorsListComponent } from './components/creditors-list/creditors-list.component';
import { SalesVchListComponent } from './components/sales-vch-list/sales-vch-list.component';
import { PurchasesVchListComponent } from './components/purchases-vch-list/purchases-vch-list.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'mobiles/new', component: ProductMasterComponent },
  { path: 'voucher/purchases', component: PurchasesVchListComponent },
  { path: 'voucher/purchases/new', component: PurchaseVoucherComponent },
  { path: 'voucher/sales', component: SalesVchListComponent },
  { path: 'voucher/sales/new', component: SalesVoucherComponent },
  { path: 'masters/debtors', component: DebtorListComponent },
  { path: 'masters/creditors', component: CreditorsListComponent },
  { path: 'masters/debtors/new', component: DebtorMasterComponent },
  { path: 'masters/creditors/new', component: CreditorMasterComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
