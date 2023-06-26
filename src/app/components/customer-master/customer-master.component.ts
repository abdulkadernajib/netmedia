import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-customer-master',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.scss']
})
export class CustomerMasterComponent {
  @Input() masterType: string;
  @Input() customer: Customer;
  @Input() states;
  @Input() cities;

  format: string = 'dd MMM, y | h:mm a'

  @Output() submitForm = new EventEmitter();
  @Output() updateEvent = new EventEmitter();
  @Output() cancelUpdateEvent = new EventEmitter();


  constructor(private voucherService: VoucherService) {

  }

  ngOnInit() {
    this.getStates()
  }

  getStates() {
    this.voucherService.getStates().subscribe(res => this.states = res);
  }

  onStateSelect() {
    var state = this.customer.address.state;

    if (state) {
      this.voucherService.getCities(state).subscribe(res => this.cities = res);
    }
  }

  onSubmit(form: NgForm) {
    this.submitForm.emit(form)
  }

  onUpdate(form: NgForm) {
    this.updateEvent.emit(form);
  }

  cancelUpdate() {
    this.cancelUpdateEvent.emit();
  }

}
