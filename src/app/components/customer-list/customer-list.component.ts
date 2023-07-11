import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {

  @Input() parties;
  @Input() listType: string;
  @Input() selectedId: string
  @Input() outstandings: string

  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Output() modalEvent = new EventEmitter();
  @Output() closeModalEvent = new EventEmitter();

  onEdit(party) {
    this.editEvent.emit(party);
  }

  onDelete() {
    this.deleteEvent.emit();
  }

  showDeleteModal(_id) {
    this.modalEvent.emit(_id);
  }

  closeModal() {
    this.closeModalEvent.emit()
  }

}
