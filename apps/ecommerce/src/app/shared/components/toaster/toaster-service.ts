import { Injectable, inject } from '@angular/core';
export type MessageType = 'error' | 'success' | 'info' | 'warn';
import { MessageService } from 'primeng/api';
type ToastPosition = 'tl' | 'bl' | 'tr' | 'br';
@Injectable({
  providedIn: 'root',
})

export class ToasterService {
   messageType :MessageType = 'info';
  messageDetails='';
  _messageService = inject(MessageService);
  position?: ToastPosition;
  showsuccess( messageDetails: string,position?: ToastPosition) {
    const key = position ?? this.position;
    this._messageService.add({severity:'success', summary: 'Success', detail: messageDetails, life: 3000, ...(key ? { key } : {})});
  }
  showError(messageDetails: string,position?: ToastPosition) {
    const key = position ?? this.position;
    this._messageService.add({severity:'error', summary: 'Error', detail: messageDetails, life: 3000, ...(key ? { key } : {})});
  }
}
