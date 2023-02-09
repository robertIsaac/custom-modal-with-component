import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../modal.service';
import { Modal } from '../modal';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  private readonly modalService = inject(ModalService);
  protected modal?: Modal;

  ngOnInit() {
    this.modalService.modal.subscribe((modal: Modal | undefined) => {
      this.modal = modal;
    });
  }

  close() {
    this.modalService.close();
  }
}
