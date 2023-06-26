import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.scss']
})
export class VoucherListComponent {
  @Input() invoices;
  @Input() listType: string;

  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  onEdit(party) {
    this.editEvent.emit(party);
  }

  onDelete(_id) {
    this.deleteEvent.emit(_id);
  }

}
