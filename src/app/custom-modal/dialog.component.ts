import {
  Component,
  Type,
  OnDestroy,
  AfterViewInit,
  ComponentRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { InsertionDirective } from './insertion.directive';
import { DialogRef } from './dialog-ref';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  componentRef!: ComponentRef<any>;
  childComponentType!: Type<any>;

  @ViewChild(InsertionDirective) insertionPoint?: InsertionDirective;

  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();

  constructor(private cd: ChangeDetectorRef, private dialogRef: DialogRef) {}

  ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onOverlayClicked(): void {
    this.dialogRef.close();
  }

  onDialogClicked(evt: MouseEvent): void {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>): void {
    let viewContainerRef = this.insertionPoint!.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentType);
  }
}
