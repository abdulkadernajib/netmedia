import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component';

@Component({
  selector: 'app-purchase-voucher',
  templateUrl: './purchase-voucher.component.html',
  styleUrls: ['./purchase-voucher.component.scss']
})
export class PurchaseVoucherComponent {
  pageTitle = 'Invoice'
  invoiceDetails: FormArray<any>;
  invoiceProducts: FormGroup<any>;
  masterCreditor: any;
  masterBrand: any
  masterProduct: any = []

  @ViewChild('toast') toast: ToastNotificationComponent;

  constructor(
    private builder: FormBuilder,
    private voucherService: VoucherService,
    private productService: ProductService,
    private router: Router) {

  }

  ngOnInit() {
    this.getCreditors();
    this.getBrands();

  }
  getCreditors() {
    this.voucherService.getCreditor().subscribe(res => {
      this.masterCreditor = res
    })
  }

  getBrands() {
    this.productService.getBrands().subscribe(res => {
      this.masterBrand = res
    })
  }

  PurchaseInvoiceForm = this.builder.group({
    invoiceNo: this.builder.control('', Validators.required),
    voucherNo: this.builder.control('135', Validators.required),
    date: this.builder.control('', Validators.required),
    creditorName: this.builder.control('Flipkart', Validators.required),
    address: this.builder.control(''),
    phone: this.builder.control(''),
    phone2: this.builder.control(''),
    total: this.builder.control({ value: 0, disabled: true }),
    gst: this.builder.control({ value: 0, disabled: true }),
    netTotal: this.builder.control({ value: 0, disabled: true }),
    details: this.builder.array([]),
  })

  onSelectCreditor() {
    const _id = this.PurchaseInvoiceForm.get("creditorName").value
    if (_id) {
      this.voucherService.getCreditorByID(_id).subscribe(c => {
        this.PurchaseInvoiceForm.get("address").setValue(`${c.address.address}, ${c.address.city}, ${c.address.pinCode}`)
        this.PurchaseInvoiceForm.get("phone").setValue(c.phone)
        this.PurchaseInvoiceForm.get("phone2").setValue(c.phone2)
      });
    }
  }

  invoiceCalculations() {
    let array = this.PurchaseInvoiceForm.getRawValue().details
    let sumTotal: number = 0
    array.forEach((e: any) => {
      sumTotal += e.cost
    });

    let sumTax = sumTotal * 0.18
    let netTotal = sumTotal + sumTax;
    let tx = sumTax.toFixed(2)

    this.PurchaseInvoiceForm.get('total').setValue(sumTotal);
    this.PurchaseInvoiceForm.get('gst').setValue(parseFloat(tx));
    this.PurchaseInvoiceForm.get('netTotal').setValue(netTotal);
  }

  brandChange(index: any) {
    this.invoiceDetails = this.PurchaseInvoiceForm.get('details') as FormArray
    this.invoiceProducts = this.invoiceDetails.at(index) as FormGroup
    const brand = this.invoiceProducts.get('brandName').value

    this.productService.getMobileByBrand(brand).subscribe(res => {
      this.masterProduct[index] = res
    })
  }

  generateRow() {
    return this.builder.group({
      brandName: this.builder.control('', Validators.required),
      product: this.builder.control('', Validators.required),
      imei: this.builder.control(''),
      cost: this.builder.control(0),

    });
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
    this.voucherService.addPurchase(this.PurchaseInvoiceForm.value).subscribe((res) => {
      this.toast.showToast(res.toString())
    })
    form.reset()
  }

  get invProducts() {
    return this.PurchaseInvoiceForm.get("details") as FormArray;
  }

  addProduct() {
    this.invoiceDetails = this.PurchaseInvoiceForm.get("details") as FormArray;
    this.invoiceDetails.push(this.generateRow());

  }

  deleteRow(i) {
    this.invoiceDetails.removeAt(i)

  }

}
