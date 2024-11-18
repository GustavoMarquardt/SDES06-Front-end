// dialog.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private openDialogSubject = new Subject<any>();
  openDialog$ = this.openDialogSubject.asObservable();

  openDialog(dialogData: any) {
    this.openDialogSubject.next(dialogData);  // Enviar dados para o dialog
  }
}