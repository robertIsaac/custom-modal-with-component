import { Component, inject } from '@angular/core';
import { DialogService } from './custom-modal/dialog.service';
import { HelloComponent } from './custom-modal/hello.component';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private modalService = inject(ModalService);
  private dialogService = inject(DialogService);

  openModal() {
    // this.modalService.open({
    //   title: 'hey there',
    //   body: 'this is just a dummy modal',
    // });

    const ref = this.dialogService.open(HelloComponent, {
      data: { message: 'I am a dynamic component inside of a dialog!' },
    });

    ref.afterClosed.subscribe((result) => {
      console.log('Dialog closed', result);
    });
  }
}
