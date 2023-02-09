import { Component, Input } from '@angular/core';
import { DialogConfig } from './dialog-config';
import { DialogRef } from './dialog-ref';

@Component({
  selector: 'hello',
  template: `
    <div class="text-wrapper">
      <p>{{ config.data.message }}</p>
    </div>
    <div class="actions">
      <button class="button" (click)="onClose()">CANCEL</button>
      <button class="button" (click)="onClose()">OK</button>
    </div>
  `,
  styles: [
    `
      :host {
        border: 2px #382ecc solid;
        font-size: 30px;
        color: #382ecc;
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .text-wrapper {
        display: flex;
        flex: 1;
        align-content: center;
        justify-content: center;
        text-align: center;
      }

      .actions {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
    `,
  ],
})
export class HelloComponent {
  constructor(public config: DialogConfig, public dialog: DialogRef) {}

  onClose(): void {
    this.dialog.close('some value');
  }
}
