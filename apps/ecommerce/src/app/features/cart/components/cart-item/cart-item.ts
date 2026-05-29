import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CartItem as CartLine, CartService } from '../../cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItemComponent {
  @Input() item!: CartLine;
  @Output() changed = new EventEmitter<void>();

  private readonly cartService = inject(CartService);

  // quantity constraints
  readonly MIN_QTY = 1;
  readonly MAX_QTY = 99;

  setQty(qty: number) {
    const clamped = Math.max(this.MIN_QTY, Math.min(this.MAX_QTY, Math.floor(qty)));
    if (!this.item._id) return;
    if (clamped === this.item.quantity) return;
    this.cartService.updateItem(this.item._id, clamped).subscribe({
      next: () => this.changed.emit(),
      error: () => this.changed.emit(),
    });
  }

  inc() {
    this.setQty((this.item.quantity ?? 1) + 1);
  }

  dec() {
    this.setQty((this.item.quantity ?? 1) - 1);
  }

  remove() {
    if (!this.item._id) return;
    this.cartService.removeItem(this.item._id).subscribe({
      next: () => this.changed.emit(),
      error: () => this.changed.emit(),
    });
  }
}
