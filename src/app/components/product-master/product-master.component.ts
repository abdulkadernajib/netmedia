import { BrandMasterComponent } from './../brand-master/brand-master.component';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { Brand } from 'src/app/models/brand.model';
import { Model } from 'src/app/models/model.model';
import { ProductService } from 'src/app/services/product.service';
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component';


@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.scss']
})
export class ProductMasterComponent {

  brands: Brand[] = [];
  brand: string;
  newBrand: string = '';
  message = "";
  brName = "";
  mobile = {
    _id: '',
    brandName: { _id: '', name: '' },
    modelName: '',
    color: '',
    countryOfOrigin: '',
    asin: ''
  }
  mobiles: Model[] = [];
  brandToast: string = 'Brand name has been added';
  productToast: string = 'Product added successfully.';
  myModal = document.getElementById('myModal')
  myInput = document.getElementById('myInput')


  @ViewChild('toast') toast: ToastNotificationComponent;
  @ViewChild('myModal') addBrand: BrandMasterComponent;




  showToast() {
    this.toast.showToast(this.productToast);
  }

  showModal() {
    // this.addBrand.showModal()
    const modalDiv = document.getElementById('addBrand')

    if (modalDiv != null) {
      modalDiv.style.display = 'block'
    }
  }
  closeModal() {
    const modalDiv = document.getElementById('addBrand')

    if (modalDiv != null) {
      modalDiv.style.display = 'none'
    }
  }

  constructor(private productService: ProductService) { }



  ngOnInit(): void {
    this.getBrandsList()
    this.mobileList()
  }

  getBrandsList() {
    this.productService.getBrands().subscribe(result => {
      this.brands = result;
      console.log(this.brands)
    });

  }

  addModel(productMaster: NgForm) {
    this.productService.createModel(productMaster.value).subscribe((res) => {
      console.log(res)
    })
    this.toast.showToast(this.productToast);
  }

  onSubmitBrandMaster() {
    this.toast.showToast(this.brandToast);
    this.sleep(2000)
    window.location.reload();
  }

  sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  // addNewBrand(){
  //   this.brandMaster.postBrand()
  // }

  // mobileList() {
  //   this.productService.getMobileList().subscribe(res => {
  //     this.mobiles = res;
  //     this.mobiles.forEach(mobile => mobile.brandName = mobile.brandName._id);
  //   });
  // }

  mobileList() {
    this.productService.getMobileList().pipe(
      map(mobiles => mobiles.map(mobile => ({
        ...mobile,
        brandName: {
          _id: mobile.brandName._id,
          name: mobile.brandName.name
        }
      })))
    ).subscribe(res => this.mobiles = res);
  }

  onEdit(mobile: Model) {
    this.mobile = mobile
  }


  //Example from EmployeDatabase
  // onSubmit(form: NgForm) { 
  //   if (form.value._id === "") {
  //     this.employeeService.postEmployee(form.value).subscribe((res) => {
  //       this.resetForm();
  //       this.refreshEmployeeList();
  //       // M.toast({ html: 'Saved Successfully', classes: 'rounded' })
  //     })
  //   }

}
