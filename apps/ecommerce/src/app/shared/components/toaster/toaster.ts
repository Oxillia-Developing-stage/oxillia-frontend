import { Component, inject, input } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

export type messageType = 'error' | 'success' | 'info' | 'warn';

@Component({
  selector: 'app-toaster',
  imports: [ToastModule],
  templateUrl: './toaster.html',
  styleUrl: './toaster.css',
})
export class Toaster {

}
