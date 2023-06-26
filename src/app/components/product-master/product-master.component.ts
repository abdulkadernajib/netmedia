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
  newBrand: string = '';
  mobile: Model = {
    _id: '',
    brandName: { _id: '', name: 'select a brand' },
    modelName: '',
    color: '',
    countryOfOrigin: '',
    asin: '',
    closingStock: null,
    sellingPrice: null,
    createdOn: '',
    lastUpdated: ''
  }
  mobiles: Model[] = [];

  myModal = document.getElementById('myModal')
  myInput = document.getElementById('myInput')


  @ViewChild('toast') toast: ToastNotificationComponent;
  @ViewChild('myModal') addBrand: BrandMasterComponent;




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
    });
  }

  addModel(productMaster: NgForm) {
    this.productService.createModel(productMaster.value).subscribe((res) => {
      this.toast.showToast(res.toString());
    })
  }


  addNewBrand(brandName) {
    this.productService.addBrand(brandName.value).subscribe(res => {
      this.toast.showToast(res.toString());
      brandName.reset();
    });
    this.getBrandsList();
  }

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

  updateMobile(form: NgForm) {
    var _id = this.mobile._id;
    this.productService.updateMobile(form.value, _id).subscribe(res => {
      form.reset();
      this.toast.showToast(res.toString());
    });
  }

  deleteMobile(_id) {
    this.productService.deleteMobile(_id).subscribe(res => {
      this.toast.showToast(res.toString());
    });
    this.mobiles = this.mobiles.filter(m => m._id !== _id);
  }


}
