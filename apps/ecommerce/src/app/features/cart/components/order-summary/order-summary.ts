import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.css',
})
export class OrderSummaryComponent {
  @Input() subtotal = 0;
  @Input() itemCount = 0;
  @Output() changed = new EventEmitter<void>();

  readonly shipping = 0;
  readonly tax = 0;

  couponCode = '';
  couponMessage = '';
  applyingCoupon = false;

  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  get total(): number {
    return this.subtotal + this.shipping + this.tax;
  }

  applyCoupon(inputValue: string): void {
    const code = inputValue.trim();

    if (!code || this.applyingCoupon) {
      return;
    }

    this.applyingCoupon = true;
    this.couponMessage = '';

    this.cartService.applyCoupon(code).subscribe({
      next: (response) => {
        this.couponCode = '';
        this.couponMessage = response.message || 'Coupon applied successfully.';
        this.applyingCoupon = false;
        this.changed.emit();
      },
      error: () => {
        this.couponMessage = 'Unable to apply coupon.';
        this.applyingCoupon = false;
      },
    });
  }

  goToCheckout(): void {
    this.router.navigateByUrl('/main/payment');
  }

}
