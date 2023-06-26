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


  @Output() addBrandEvent = new EventEmitter();
  name: string = '';

  constructor(private productService: ProductService) { }
  onSubmit(form: NgForm) {
    this.addBrandEvent.emit(form)
  }

}


