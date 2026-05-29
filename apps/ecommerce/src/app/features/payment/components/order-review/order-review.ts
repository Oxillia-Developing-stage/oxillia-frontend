import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem as CartLine } from '../../../cart/cart.service';

@Component({
  selector: 'app-order-review',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './order-review.html',
  styleUrl: './order-review.css',
})
export class OrderReviewComponent {
  @Input() items: CartLine[] = [];
  @Input() subtotal = 0;
  @Input() shippingPrice: number | null = null;
  @Input() total = 0;
  @Input() buttonLabel = 'Pay Now';
  @Input() paymentMethod: 'stripe' | 'paymob' | 'cod' = 'stripe';
  @Output() submit = new EventEmitter<void>();

  get shippingLabel(): string {
    if (this.shippingPrice === null) {
      return 'Calculated at checkout';
    }

    return this.shippingPrice === 0 ? 'Free' : `$${this.shippingPrice.toFixed(1)}`;
  }
}