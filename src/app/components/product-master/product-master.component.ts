import { BrandMasterComponent } from './../brand-master/brand-master.component';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { combineLatest, forkJoin, map, mergeMap, zip } from 'rxjs';
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
    gstRate: null,
    hsn: '',
    sellingPrice: null,
    createdAt: '',
    updatedAt: ''
  }
  format: string = 'dd MMM, y | h:mm a'
  mobiles = [];
  selectedId: string

  myModal = document.getElementById('myModal')
  myInput = document.getElementById('myInput')


  @ViewChild('toast') toast: ToastNotificationComponent;
  @ViewChild('myModal') addBrand: BrandMasterComponent;




  showBrandModal() {
    // this.addBrand.showModal()
    const modalDiv = document.getElementById('addBrand')

    if (modalDiv != null) {
      modalDiv.style.display = 'block'
    }
  }
  showDeleteModal(_id) {
    const modalDiv = document.getElementById('deleteWarning')
    if (modalDiv != null) {
      modalDiv.style.display = 'block'
      this.selectedId = _id
    }
  }

  closeModal() {
    const brandModal = document.getElementById('addBrand')
    const deleteModal = document.getElementById('deleteWarning')

    if (brandModal != null) {
      brandModal.style.display = 'none'
    }
    if (deleteModal != null) {
      deleteModal.style.display = 'none'
      this.selectedId = ''
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
      this.mobileList()
    })
    productMaster.reset()
    this.mobile.brandName = { _id: '', name: 'select a brand' }
  }

  updateMobile(form: NgForm) {
    var _id = this.mobile._id;
    this.productService.updateMobile(form.value, _id).subscribe(res => {
      this.toast.showToast(res.toString());
      this.mobileList()
    });
    form.reset();
    this.mobile.brandName = { _id: '', name: 'select a brand' }
    this.mobile._id = ''
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
      mergeMap(mobiles => {
        const purRequests = mobiles.map((mobile) => this.productService.imeiList(mobile._id))
        const salRequests = mobiles.map((mobile) => this.productService.unsoldImeiList(mobile._id))
        let unsoldImeiList
        return forkJoin(purRequests,).pipe(
          map((totalImei) => {

            unsoldImeiList = forkJoin(salRequests).pipe(
              map((unsoldImei) => {
                m1.forEach((m, index) => {
                  m.instock = unsoldImei[index].length
                });

              })).subscribe();

            const m1 = mobiles.map((m, index) => ({
              _id: m._id,
              brandName: {
                _id: m.brandName._id,
                name: m.brandName.name
              },
              modelName: m.modelName,
              color: m.color,
              tPur: totalImei[index].length
            }));
            return m1

          }));
      })).subscribe(res => {
        this.mobiles = res
      })
  }

  onEdit(mobile: Model) {
    this.mobile = mobile
  }

  deleteMobile() {
    let _id = this.selectedId
    this.productService.deleteMobile(_id).subscribe(res => {
      this.toast.showToast(res.toString());
      this.mobiles = this.mobiles.filter(m => m._id !== _id);
    });
    document.getElementById('deleteWarning').style.display = 'none'
  }


}
