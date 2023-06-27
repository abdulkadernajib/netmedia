import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { ProductMasterComponent } from './components/product-master/product-master.component';
import { BrandMasterComponent } from './components/brand-master/brand-master.component';
import { PurchaseVoucherComponent } from './components/purchase-voucher/purchase-voucher.component';
import { SalesVoucherComponent } from './components/sales-voucher/sales-voucher.component';
import { ProductService } from './services/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ToastNotificationComponent } from './components/toast-notification/toast-notification.component';
import { CreditorMasterComponent } from './components/creditor-master/creditor-master.component';
import { DebtorMasterComponent } from './components/debtor-master/debtor-master.component';
import { DebtorListComponent } from './components/debtor-list/debtor-list.component';
import { CustomerMasterComponent } from './components/customer-master/customer-master.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CreditorsListComponent } from './components/creditors-list/creditors-list.component';
import { TestComponent } from './test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { VoucherListComponent } from './components/voucher-list/voucher-list.component';
import { SalesVchListComponent } from './components/sales-vch-list/sales-vch-list.component';
import { PurchasesVchListComponent } from './components/purchases-vch-list/purchases-vch-list.component'
import { VoucherService } from './services/voucher.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductMasterComponent,
    BrandMasterComponent,
    PurchaseVoucherComponent,
    SalesVoucherComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ToastNotificationComponent,
    CreditorMasterComponent,
    DebtorMasterComponent,
    DebtorListComponent,
    CustomerMasterComponent,
    CustomerListComponent,
    CreditorsListComponent,
    TestComponent,
    VoucherListComponent,
    SalesVchListComponent,
    PurchasesVchListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

