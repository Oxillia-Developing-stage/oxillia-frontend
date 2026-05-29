import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';

export type PaymentMethodType = 'stripe' | 'paymob' | 'cod';

export interface PaymentMethodSelection {
  method: PaymentMethodType;
  sameAsShipping: boolean;
}

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [CommonModule, FormsModule, RadioButtonModule, CheckboxModule],
  templateUrl: './payment-method.html',
  styleUrl: './payment-method.css',
})
export class PaymentMethodComponent {
  @Input() method: PaymentMethodType = 'stripe';
  @Input() sameAsShipping = true;
  @Output() selectionChange = new EventEmitter<PaymentMethodSelection>();

  readonly methods: Array<{ value: PaymentMethodType; label: string; description: string }> = [
    { value: 'stripe', label: 'Stripe', description: 'Secure card checkout' },
    { value: 'paymob', label: 'Paymob', description: 'Local gateway checkout' },
    { value: 'cod', label: 'Cash on delivery', description: 'Pay when you receive' },
  ];

  emitChange(): void {
    this.selectionChange.emit({ method: this.method, sameAsShipping: this.sameAsShipping });
  }
}