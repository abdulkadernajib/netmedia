import { Component, Input } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-toast-notification',
  template: `
     <div class="position-fixed bottom-0 end-0 p-3">
      <div class="toast">
        <div class="toast-body row">
          <div class="col-10"> {{message}}</div>
          <div class="col-2"> 
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>          
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ToastNotificationComponent {

  message: String;


  showToast(message: string) {
    this.message = message;
    const toast = document.querySelector('.toast');
    const bsToast = new bootstrap.Toast(toast);
    return bsToast.show();
  }

}
