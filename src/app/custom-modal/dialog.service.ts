import {
  Injectable,
  ApplicationRef,
  ComponentRef,
  Type, createComponent, EnvironmentInjector, Inject, createEnvironmentInjector,
} from '@angular/core';
import { DialogModule } from './dialog.module';
import { DialogComponent } from './dialog.component';
import { DialogConfig } from './dialog-config';
import { DialogRef } from './dialog-ref';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: DialogModule,
})
export class DialogService {
  dialogComponentRef!: ComponentRef<DialogComponent>;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  public open(componentType: Type<any>, config: DialogConfig): DialogRef {
    const dialogRef = this.appendDialogComponentToBody(config);

    this.dialogComponentRef.instance.childComponentType = componentType;

    return dialogRef;
  }

  private appendDialogComponentToBody(config: DialogConfig): DialogRef {
    const dialogRef = new DialogRef();

    const sub = dialogRef.afterClosed.subscribe(() => {
      // close the dialog
      this.removeDialogComponentFromBody();
      sub.unsubscribe();
    });
    const environmentInjector = createEnvironmentInjector([
      {
        provide: DialogRef,
        useValue: dialogRef,
      },
      {
        provide: DialogConfig,
        useValue: config,
      },
    ], this.injector);
    const componentRef = createComponent(DialogComponent, {environmentInjector});
    this.appRef.attachView(componentRef.hostView);
    this.document.body.appendChild(componentRef.location.nativeElement);

    this.dialogComponentRef = componentRef;

    this.dialogComponentRef.instance.onClose.subscribe(() => {
      this.removeDialogComponentFromBody();
    });

    return dialogRef;
  }

  private removeDialogComponentFromBody(): void {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }
}
