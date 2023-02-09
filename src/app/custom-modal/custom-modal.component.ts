import { Component } from '@angular/core';
import { DialogService } from './dialog.service';
import { HelloComponent } from './hello.component';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss'],
})
export class CustomModalComponent {
  constructor(public dialog: DialogService) {}
  openModal() {
    const ref = this.dialog.open(HelloComponent, {
      data: { message: 'I am a dynamic component inside of a dialog!' },
    });

    ref.afterClosed.subscribe((result) => {
      console.log('Dialog closed', result);
    });
  }
}
