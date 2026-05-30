import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartItem as CartLine } from '../cart/cart.service';

interface OrderReviewState {
  orderId?: string;
  addressLine?: string;
  countryName?: string;
  governorateName?: string;
  districtName?: string;
  items?: CartLine[];
  subtotal?: number;
  shipping?: number;
  total?: number;
  paymentMethod?: 'stripe' | 'paymob' | 'cod';
}

interface OrderStatusStep {
  key: string;
  label: string;
  icon: 'processing' | 'shipping' | 'delivery';
  status: 'completed' | 'active' | 'upcoming';
}

@Component({
  selector: 'app-order-review-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-review-page.html',
  styleUrl: './order-review-page.css',
})
export class OrderReviewPageComponent implements OnInit {
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  orderId = '';
  orderNumber = '';
  confirmationEmail = 'your email';
  addressLine = '';
  countryName = '';
  governorateName = '';
  districtName = '';
  items: CartLine[] = [];
  subtotal = 0;
  shippingPrice: number | null = null;
  total = 0;
  paymentMethod: 'stripe' | 'paymob' | 'cod' = 'cod';

  ngOnInit(): void {
    const state = typeof window !== 'undefined' ? (window.history.state as OrderReviewState | null) : null;
    const cookieEmail = this.cookieService.get('userEmail');

    if (cookieEmail) {
      this.confirmationEmail = cookieEmail;
    }

    if (!state) {
      return;
    }

    this.orderId = state.orderId ?? '';
    this.orderNumber = this.formatOrderNumber(this.orderId);
    this.addressLine = state.addressLine ?? '';
    this.countryName = state.countryName ?? '';
    this.governorateName = state.governorateName ?? '';
    this.districtName = state.districtName ?? '';
    this.items = state.items ?? [];
    this.subtotal = state.subtotal ?? 0;
    this.shippingPrice = typeof state.shipping === 'number' ? state.shipping : null;
    this.total = state.total ?? this.subtotal + (this.shippingPrice ?? 0);
    this.paymentMethod = state.paymentMethod ?? 'cod';
  }

  get shippingRecipient(): string {
    return this.governorateName || this.districtName || this.countryName || 'Shipping address';
  }

  get shippingLines(): string[] {
    return [this.addressLine, this.districtName, this.governorateName, this.countryName].filter(
      (line): line is string => Boolean(line && line.trim().length > 0),
    );
  }

  get shippingLabel(): string {
    return this.shippingPrice === null ? 'Calculated at checkout' : this.shippingPrice === 0 ? 'Free' : `$${this.shippingPrice.toFixed(1)}`;
  }

  get deliveryMethodLabel(): string {
    return this.paymentMethod === 'cod' ? 'Standard Shipping' : 'Express Shipping';
  }

  get deliveryMethodNote(): string {
    return this.paymentMethod === 'cod' ? 'Estimated arrival 3-5 business days' : 'Estimated arrival 1-3 business days';
  }

  get statusSteps(): OrderStatusStep[] {
    return [
      { key: 'processing', label: 'processing', icon: 'processing', status: 'active' },
      { key: 'shipping', label: 'shipping', icon: 'shipping', status: 'upcoming' },
      { key: 'delivery', label: 'delivery', icon: 'delivery', status: 'upcoming' },
    ];
  }

  get displayItems(): Array<CartLine & { lineTotal: number }> {
    return this.items.map((item) => ({
      ...item,
      lineTotal: (item.price ?? 0) * (item.quantity ?? 1),
    }));
  }

  trackOrder(): void {
    if (!this.orderId) {
      void this.router.navigate(['/main/order']);
      return;
    }

    void this.router.navigate(['/main/order'], {
      state: {
        orderId: this.orderId,
      },
    });
  }

  continueShopping(): void {
    void this.router.navigate(['/main/shop']);
  }

  private formatOrderNumber(orderId: string): string {
    if (!orderId) {
      return 'Pending';
    }

    return `#OX ${orderId.slice(-4).toUpperCase()}`;
  }
}