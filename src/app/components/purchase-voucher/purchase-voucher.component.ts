import { Component, ViewChild } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ProductService } from 'src/app/services/product.service'
import { VoucherService } from 'src/app/services/voucher.service'
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component'

@Component({
  selector: 'app-purchase-voucher',
  templateUrl: './purchase-voucher.component.html',
  styleUrls: ['./purchase-voucher.component.scss']
})
export class PurchaseVoucherComponent {
  pageTitle = 'Purchases Invoice'
  invoiceDetails: FormArray<any>
  invoiceProducts: FormGroup<any>
  masterCreditor: any
  masterBrand: any
  masterProduct: any = []
  isIntraState: boolean = true
  hsn: any = []
  gst: any = []
  productGst: any = []
  isDisabled = true

  @ViewChild('toast') toast: ToastNotificationComponent

  constructor(
    private builder: FormBuilder,
    private voucherService: VoucherService,
    private productService: ProductService,
    private router: Router) {

  }

  ngOnInit() {
    this.getCreditors()
    this.getBrands()
    this.purchaseRefNo()

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

  purchaseRefNo() {
    this.voucherService.purchaseRefNo().subscribe(res => {
      this.PurchaseInvoiceForm.get('voucherNo').setValue(res)
    })
  }

  PurchaseInvoiceForm = this.builder.group({
    invoiceNo: this.builder.control('', Validators.required),
    voucherNo: this.builder.control('', Validators.required),
    date: this.builder.control('', Validators.required),
    creditor: this.builder.control('', Validators.required),
    address: this.builder.control({ value: '', disabled: true }),
    phone: this.builder.control({ value: '', disabled: true }),
    total: this.builder.control(0),
    isIntraState: this.builder.control(true, Validators.required),
    cgst: this.builder.control(0),
    sgst: this.builder.control(0),
    igst: this.builder.control(0),
    netTotal: this.builder.control({ value: 0, disabled: true }),
    details: this.builder.array([]),
  })


  onSelectCreditor() {
    const _id = this.PurchaseInvoiceForm.get("creditor").value
    if (_id) {
      this.voucherService.getCreditorByID(_id).subscribe(c => {
        this.PurchaseInvoiceForm.get("address").setValue(`${c.address.address}, ${c.address.city}, ${c.address.pinCode}`)
        if (c.phone2) {
          this.PurchaseInvoiceForm.get("phone").setValue(c.phone + ' / ' + c.phone2)
        } else { this.PurchaseInvoiceForm.get("phone").setValue(c.phone) }
        if (c.address.state !== 'Maharashtra') {
          this.PurchaseInvoiceForm.get("isIntraState").setValue(false)
          this.isIntraState = false
        }
      })
      if (!this.invProducts.controls.length) {
        this.addProduct()
      }
    }
  }

  brandChange(index: any) {
    this.invoiceDetails = this.PurchaseInvoiceForm.get('details') as FormArray
    this.invoiceProducts = this.invoiceDetails.at(index) as FormGroup
    const brand = this.invoiceProducts.get('brandName').value

    this.productService.getMobileByBrand(brand).subscribe(res => {
      this.masterProduct[index] = res
    })
  }

  onSelectProduct(index: any) {
    this.invoiceDetails = this.PurchaseInvoiceForm.get('details') as FormArray
    this.invoiceProducts = this.invoiceDetails.at(index) as FormGroup
    const model = this.invoiceProducts.get('product').value
    this.productService.getMobileById(model).subscribe(res => {
      let product = res.mobile
      this.hsn[index] = product.hsn
      let gstRate = product.gstRate
      this.productGst[index] = product.gstRate

      if (this.isIntraState) {
        let g = gstRate / 2
        this.gst[index] = `CGST @ ${g}% | SGST @ ${g}%`
      } else { this.gst[index] = `IGST @ ${gstRate}%` }

    })
  }

  invoiceCalculations() {
    let array = this.PurchaseInvoiceForm.getRawValue().details
    let sumTotal: number = 0
    let sumTax: number = 0
    array.forEach((e: any) => {
      sumTotal += e.amount
      sumTax += (e.amount * e.gst / 100)
    })

    let netTotal = sumTotal + sumTax
    let tx = sumTax.toFixed(2)


    this.PurchaseInvoiceForm.get('total').setValue(sumTotal)
    this.PurchaseInvoiceForm.get('netTotal').setValue(netTotal)

    if (this.isIntraState) {
      this.PurchaseInvoiceForm.get('cgst').setValue(parseFloat(tx) / 2)
      this.PurchaseInvoiceForm.get('sgst').setValue(parseFloat(tx) / 2)
    } else {
      this.PurchaseInvoiceForm.get('igst').setValue(parseFloat(tx))
    }
  }

  generateRow() {
    return this.builder.group({
      brandName: this.builder.control('', Validators.required),
      product: this.builder.control('', Validators.required),
      imei: this.builder.control(''),
      amount: this.builder.control(0),
      gst: this.builder.control({ value: 0, disabled: true }),

    })
  }

  priceChange(index: any) {
    this.invoiceDetails = this.PurchaseInvoiceForm.get('details') as FormArray
    this.invoiceProducts = this.invoiceDetails.at(index) as FormGroup
    let price = this.invoiceProducts.get('amount').value
    this.invoiceProducts.get('gst').setValue(price * this.productGst[index] / 100)
    this.invoiceCalculations()

  }

  savePurchase(form) {
    this.voucherService.addPurchase(this.PurchaseInvoiceForm.value).subscribe((res) => {
      this.toast.showToast(res.toString())
    })
    form.reset()
    this.purchaseRefNo()
    this.invProducts.clear()
    this.addProduct()

  }

  get invProducts() {
    return this.PurchaseInvoiceForm.get("details") as FormArray
  }

  addProduct() {
    this.invoiceDetails = this.PurchaseInvoiceForm.get("details") as FormArray
    this.invoiceDetails.push(this.generateRow())

  }

  deleteRow(i) {
    this.invoiceDetails.removeAt(i)

  }

}
