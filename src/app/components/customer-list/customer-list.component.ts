import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {

  @Input() parties;
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
