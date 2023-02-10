import { Component, inject } from '@angular/core';
import { DialogService } from './custom-modal/dialog.service';
import { HelloComponent } from './custom-modal/hello.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private dialogService = inject(DialogService);

  openModal() {
    const ref = this.dialogService.open(HelloComponent, {
      data: { message: 'I am a dynamic component inside of a dialog!' },
    });

    ref.afterClosed.subscribe((result) => {
      console.log('Dialog closed', result);
    });
  }
}
