import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Brand } from 'src/app/models/brand.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-brand-master',
  templateUrl: './brand-master.component.html',
  styleUrls: ['./brand-master.component.scss']
})
export class BrandMasterComponent {

  @Input('dataName') name: string;
  @Input() brand: String;
  @Output() childEvent = new EventEmitter();
  @Output() postBrand = new EventEmitter();

  fireEvent() {
    this.childEvent.emit('Hello World');
  }



  constructor(private productService: ProductService) { }

  onSubmit() {
    this.postBrand.emit(this.brand)
    // this.productService.addBrand(brand)
  }


}


