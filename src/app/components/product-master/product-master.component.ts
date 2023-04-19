import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Brand } from 'src/app/models/brand.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.scss']
})
export class ProductMasterComponent {

  brands: Brand[] = [];
  brand: string;
  myName = "Abdulkader";
  message = "";
  brName = "";

  constructor(private productService: ProductService) { }



  ngOnInit(): void {
    this.productService.getBrands().subscribe(result => {
      this.brands = result;
      console.log(this.brands)
    });
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
