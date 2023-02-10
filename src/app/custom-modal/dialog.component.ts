import {
  Component,
  Type,
  OnDestroy,
  AfterViewInit,
  ComponentRef,
  ViewChild,
  ChangeDetectorRef, Input,
} from '@angular/core';
import { InsertionDirective } from './insertion.directive';
import { DialogRef } from './dialog-ref';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  @Input() childComponentType!: Type<any>;

  @ViewChild(InsertionDirective) private insertionPoint!: InsertionDirective;

  private componentRef!: ComponentRef<unknown>;
  constructor(private cd: ChangeDetectorRef, private dialogRef: DialogRef) {}

  ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.componentRef.destroy();
  }

  protected onOverlayClicked(): void {
    this.dialogRef.close('overlay');
  }

  private loadChildComponent(componentType: Type<unknown>): void {
    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentType);
  }
}
