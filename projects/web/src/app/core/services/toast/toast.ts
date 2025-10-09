import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class Toast {
  private toast = inject(ToastrService);

  showError(errors: string[]) {
    this.toast.error(errors.join('\n'), 'Erro', {
      timeOut: 5000,
      positionClass: 'toast-bottom-left',
      closeButton: true,
      progressBar: true,
    });
  }
  showSuccess(message: string) {
    this.toast.success(message, 'Sucesso', {
      timeOut: 3000,
      positionClass: 'toast-bottom-left',
      closeButton: true,
      progressBar: true,
    });
  }
  showWarning(message: string) {
    this.toast.warning(message, 'Atenção', {
      timeOut: 4000,
      positionClass: 'toast-bottom-left',
      closeButton: true,
      progressBar: true,
    });
  }
}
