import { Component, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Brand } from 'src/app/models/brand.model';
import { ProductService } from 'src/app/services/product.service';
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component';
// import * as $ from 'jquery';

declare var $: any;
@Component({
  selector: 'app-brand-master',
  templateUrl: './brand-master.component.html',
  styleUrls: ['./brand-master.component.scss']
})
export class BrandMasterComponent {

  @Input('brandToast') toastMessage: string;
  @Output() childEvent = new EventEmitter();
  @Output() clickSubmit = new EventEmitter();
  name: string = '';

  @ViewChild('toast') toast: ToastNotificationComponent;

  showToast() {
    this.toast.showToast(this.toastMessage);
    this.clickSubmit.emit();
  }







  constructor(private productService: ProductService) { }
  onSubmit(form: NgForm) {
    this.productService.addBrand(form.value).subscribe()
  }
  // onSubmit(form: NgForm) {
  //   this.postBrand.emit(this.productService.addBrand(form.value))
  // }
  // this.productService.addBrand(brand)

  showModal() {
    $('#addBrand').modal('show');
  }

  hideModal() {
    $('#addBrand').modal('hide');
  }


}


