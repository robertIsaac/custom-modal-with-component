import { Subject } from 'rxjs';

export class DialogRef {
  close(result?: unknown): void {
    this._afterClosed.next(result);
  }

  private readonly _afterClosed = new Subject<unknown>();

  afterClosed = this._afterClosed.asObservable();
}
