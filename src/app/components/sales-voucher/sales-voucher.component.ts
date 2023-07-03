import { Component, ViewChild } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ProductService } from 'src/app/services/product.service'
import { VoucherService } from 'src/app/services/voucher.service'
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component'

@Component({
  selector: 'app-sales-voucher',
  templateUrl: './sales-voucher.component.html',
  styleUrls: ['./sales-voucher.component.scss']
})
export class SalesVoucherComponent {

  pageTitle = 'Sales Invoice'
  invoiceDetails: FormArray<any>
  invoiceProducts: FormGroup<any>
  masterDebtor: any
  masterBrand: any
  isIntraState: boolean = true
  masterProduct: any = []
  masterImei: any = []
  hsn: any = []
  gst: any = []
  productGst: any = []
  showCost: boolean = true


  @ViewChild('toast') toast: ToastNotificationComponent

  constructor(
    private builder: FormBuilder,
    private voucherService: VoucherService,
    private productService: ProductService,
    private router: Router) {

  }

  ngOnInit() {
    this.getDebtors()
    this.getBrands()
    this.salesRefNo()


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

  salesRefNo() {
    this.voucherService.salesInvNo().subscribe(res => {
      this.SalesInvoiceForm.get('voucherNo').setValue(res)
      this.SalesInvoiceForm.get('invoiceNo').setValue(res)
    })
  }

  SalesInvoiceForm = this.builder.group({
    invoiceNo: this.builder.control('', Validators.required),
    voucherNo: this.builder.control('', Validators.required),
    date: this.builder.control('', Validators.required),
    debtor: this.builder.control('', Validators.required),
    address: this.builder.control({ value: '', disabled: true }),
    phone: this.builder.control({ value: '', disabled: true }),
    deliveryAddress: this.builder.control(''),
    delPhone: this.builder.control(''),
    total: this.builder.control(0),
    cgst: this.builder.control(0),
    sgst: this.builder.control(0),
    igst: this.builder.control(0),
    isIntraState: this.builder.control(true),
    netTotal: this.builder.control({ value: 0, disabled: true }),
    details: this.builder.array([]),
  })

  onSelectDebtor() {
    const _id = this.SalesInvoiceForm.get("debtor").value

    if (_id) {
      this.voucherService.getDebtorByID(_id).subscribe((debtor: any) => {
        let address = `${debtor.debtor.address.address}, ${debtor.debtor.address.city}, ${debtor.debtor.address.pinCode}`

        this.SalesInvoiceForm.get("address").setValue(address)
        if (debtor.debtor.phone2) {
          this.SalesInvoiceForm.get("phone").setValue(debtor.debtor.phone + ' / ' + debtor.debtor.phone2)
        } else { this.SalesInvoiceForm.get("phone").setValue(debtor.debtor.phone) }

        this.SalesInvoiceForm.get("deliveryAddress").setValue(address)
        if (debtor.debtor.phone2) {
          this.SalesInvoiceForm.get("delPhone").setValue(debtor.debtor.phone + ' / ' + debtor.debtor.phone2)
        } else { this.SalesInvoiceForm.get("delPhone").setValue(debtor.debtor.phone) }

        if (debtor.debtor.address.state !== 'Maharashtra') {
          this.SalesInvoiceForm.get("isIntraState").setValue(false)
        }
      })
      if (!this.invProducts.controls.length) {
        this.addProduct()
      }

    }
  }

  brandChange(index: any) {
    this.invoiceDetails = this.SalesInvoiceForm.get('details') as FormArray
    this.invoiceProducts = this.invoiceDetails.at(index) as FormGroup
    const brand = this.invoiceProducts.get('brandName').value

    this.productService.getMobileByBrand(brand).subscribe(res => {
      this.masterProduct[index] = res
    })
  }

  onSelectProduct(index: any) {
    this.invoiceDetails = this.SalesInvoiceForm.get('details') as FormArray
    this.invoiceProducts = this.invoiceDetails.at(index) as FormGroup
    const model = this.invoiceProducts.get('product').value

    this.productService.unsoldImeiList(model).subscribe(res => {
      this.masterImei[index] = res
    })
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

  priceChange(index: any) {
    this.invoiceDetails = this.SalesInvoiceForm.get('details') as FormArray
    this.invoiceProducts = this.invoiceDetails.at(index) as FormGroup
    let price = this.invoiceProducts.get('amount').value

    this.invoiceProducts.get('gst').setValue(price * this.productGst[index] / 100)
    this.invoiceCalculations()

  }

  invoiceCalculations() {
    let array = this.SalesInvoiceForm.getRawValue().details
    let sumTotal: number = 0
    let sumTax: number = 0
    array.forEach((e: any) => {
      sumTotal += e.amount
      sumTax += e.gst
    })
    console.log(sumTax);

    let netTotal = sumTotal + sumTax
    let tx = sumTax.toFixed(2)

    this.SalesInvoiceForm.get('total').setValue(sumTotal)
    this.SalesInvoiceForm.get('netTotal').setValue(netTotal)

    if (this.isIntraState) {
      this.SalesInvoiceForm.get('cgst').setValue(parseFloat(tx) / 2)
      this.SalesInvoiceForm.get('sgst').setValue(parseFloat(tx) / 2)
    } else {
      this.SalesInvoiceForm.get('igst').setValue(parseFloat(tx))
    }
  }

  generateRow() {
    return this.builder.group({
      brandName: this.builder.control('', Validators.required),
      product: this.builder.control('', Validators.required),
      imei: this.builder.control('', Validators.required),
      gst: this.builder.control({ value: 0, disabled: true }),
      amount: this.builder.control(0, Validators.required)
    })
  }

  addProduct() {
    this.invoiceDetails = this.SalesInvoiceForm.get("details") as FormArray
    this.invoiceDetails.push(this.generateRow())

  }

  deleteRow(i) {
    this.invoiceDetails.removeAt(i)
    this.invoiceCalculations()

  }

  costPrice(index) {

    if (this.showCost) {
      this.invoiceDetails = this.SalesInvoiceForm.get('details') as FormArray
      this.invoiceProducts = this.invoiceDetails.at(index) as FormGroup
      let productId = this.invoiceProducts.get('product').value
      let imeiId = this.invoiceProducts.get('imei').value

      this.productService.imeiList(productId).subscribe(res => {
        let data = res.filter((a: any) => a._id === imeiId)
        this.invoiceProducts.get('amount').setValue(data[0].costPrice)
      })
    } else { this.invoiceProducts.get('amount').setValue(0) }

    this.showCost = !this.showCost
  }

  savePurchase(form) {
    this.voucherService.addSales(this.SalesInvoiceForm.value).subscribe((res) => {
      this.toast.showToast(res.toString())
    })
    form.reset()
    this.salesRefNo()
    this.invProducts.clear()
  }

  get invProducts() {
    return this.SalesInvoiceForm.get("details") as FormArray
  }


}
