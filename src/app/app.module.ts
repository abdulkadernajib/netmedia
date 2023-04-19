import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { ProductMasterComponent } from './components/product-master/product-master.component';
import { BrandMasterComponent } from './components/brand-master/brand-master.component';
import { PurchaseVoucherComponent } from './components/purchase-voucher/purchase-voucher.component';
import { SalesVoucherComponent } from './components/sales-voucher/sales-voucher.component';
import { ProductService } from './services/product.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductMasterComponent,
    BrandMasterComponent,
    PurchaseVoucherComponent,
    SalesVoucherComponent,
    DashboardComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
