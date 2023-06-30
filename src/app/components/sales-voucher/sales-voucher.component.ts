import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component';

@Component({
  selector: 'app-sales-voucher',
  templateUrl: './sales-voucher.component.html',
  styleUrls: ['./sales-voucher.component.scss']
})
export class SalesVoucherComponent {

  pageTitle = 'Sales Invoice'
  invoiceDetails: FormArray<any>;
  invoiceProducts: FormGroup<any>;
  masterDebtor: any;
  masterBrand: any
  masterProduct: any = []
  masterImei: any = []

  @ViewChild('toast') toast: ToastNotificationComponent;

  constructor(
    private builder: FormBuilder,
    private voucherService: VoucherService,
    private productService: ProductService,
    private router: Router) {

  }

  ngOnInit() {
    this.getDebtors();
    this.getBrands();

  }
  getDebtors() {
    this.voucherService.getDebtor().subscribe(res => {
      this.masterDebtor = res
    })
  }

  getBrands() {
    this.productService.getBrands().subscribe(res => {
      this.masterBrand = res
    })
  }

  SalesInvoiceForm = this.builder.group({
    invoiceNo: this.builder.control('', Validators.required),
    voucherNo: this.builder.control('135', Validators.required),
    date: this.builder.control('', Validators.required),
    debtorName: this.builder.control('Flipkart', Validators.required),
    address: this.builder.control(''),
    deliveryAddress: this.builder.control(''),
    phone: this.builder.control(''),
    phone2: this.builder.control(''),
    total: this.builder.control({ value: 0, disabled: true }),
    gst: this.builder.control({ value: 0, disabled: true }),
    netTotal: this.builder.control({ value: 0, disabled: true }),
    details: this.builder.array([]),
  })

  onSelectDebtor() {
    const _id = this.SalesInvoiceForm.get("debtorName").value

    if (_id) {
      this.voucherService.getDebtorByID(_id).subscribe((debtor: any) => {
        let address = `${debtor.debtor.address.address}, ${debtor.debtor.address.city}, ${debtor.debtor.address.pinCode}`;

        this.SalesInvoiceForm.get("address").setValue(address)
        this.SalesInvoiceForm.get("deliveryAddress").setValue(address)
        this.SalesInvoiceForm.get("phone").setValue(debtor.debtor.phone)
        this.SalesInvoiceForm.get("phone2").setValue(debtor.debtor.phone2)
      });
    }
  }

  invoiceCalculations() {
    let array = this.SalesInvoiceForm.getRawValue().details
    let sumTotal: number = 0
    array.forEach((e: any) => {
      sumTotal += e.amount
    });

    let sumTax = sumTotal * 0.18
    let netTotal = sumTotal + sumTax;
    let tx = sumTax.toFixed(2)

    this.SalesInvoiceForm.get('total').setValue(sumTotal);
    this.SalesInvoiceForm.get('gst').setValue(parseFloat(tx));
    this.SalesInvoiceForm.get('netTotal').setValue(netTotal);
  }

  brandChange(index: any) {
    this.invoiceDetails = this.SalesInvoiceForm.get('details') as FormArray
    this.invoiceProducts = this.invoiceDetails.at(index) as FormGroup
    const brand = this.invoiceProducts.get('brandName').value

    this.productService.getMobileByBrand(brand).subscribe(res => {
      this.masterProduct[index] = res
    })
  }

  onProductSelect(index: any) {
    this.invoiceDetails = this.SalesInvoiceForm.get('details') as FormArray
    this.invoiceProducts = this.invoiceDetails.at(index) as FormGroup
    const product = this.invoiceProducts.get('product').value

    console.log(product);


    this.productService.getImeiList(product).subscribe(res => {
      this.masterImei[index] = res
      console.log(res);

    })
  }

  generateRow() {
    return this.builder.group({
      brandName: this.builder.control('', Validators.required),
      product: this.builder.control('', Validators.required),
      imei: this.builder.control('', Validators.required),
      amount: this.builder.control(0)
    });
  }

  addProduct() {
    this.invoiceDetails = this.SalesInvoiceForm.get("details") as FormArray;
    this.invoiceDetails.push(this.generateRow());

  }

  deleteRow(i) {
    this.invoiceDetails.removeAt(i)
    this.invoiceCalculations()

  }

  priceChange() {
    // this.invoiceDetails = this.PurchaseInvoiceForm.get('details') as FormArray
    // this.invoiceProducts = this.invoiceDetails.at(index) as FormGroup
    // let price = this.invoiceProducts.get('cost').value;
    // let qty = this.invoiceProducts.get('qty').value;
    // this.invoiceProducts.get('total').setValue(price * qty);
    this.invoiceCalculations()

  }

  savePurchase(form) {
    this.voucherService.addSales(this.SalesInvoiceForm.value).subscribe((res) => {
      this.toast.showToast(res.toString());
    })
    form.reset()
    console.log(this.SalesInvoiceForm.value)
  }

  get invProducts() {
    return this.SalesInvoiceForm.get("details") as FormArray;
  }


}
