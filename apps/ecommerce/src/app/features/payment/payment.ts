import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService, CartDto, CartItem as CartLine } from '../cart/cart.service';
import { OrderService } from '../order/order.service';
import { PaymentService } from './payment.service';
import { PaymentAddressComponent, PaymentAddressValue } from './components/payment-address/payment-address';
import { PaymentMethodComponent, PaymentMethodSelection, PaymentMethodType } from './components/payment-method/payment-method';
import { OrderReviewComponent } from './components/order-review/order-review';
import { ToasterService } from '../../shared/components/toaster/toaster-service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterLink, PaymentAddressComponent, PaymentMethodComponent, OrderReviewComponent],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly paymentService = inject(PaymentService);
  private readonly toasterService = inject(ToasterService);
  private readonly router = inject(Router);

  cartItems: CartLine[] = [];
  loading = true;
  selectedPaymentMethod: PaymentMethodType = 'stripe';
  sameAsShipping = true;
  shippingPrice: number | null = null;
  address: PaymentAddressValue | null = null;
  submitting = false;
  subtotal = 0;

  get total(): number {
    return this.subtotal + (this.shippingPrice ?? 0);
  }

  get checkoutLabel(): string {
    return this.selectedPaymentMethod === 'cod' ? 'Place Order' : 'Pay Now';
  }

  get shippingToText(): string {
    if (!this.address?.governorateName && !this.address?.districtName) {
      return 'Select your shipping address';
    }

    return `${this.address.districtName ?? this.address.governorateName ?? 'Your area'}`;
  }

  ngOnInit(): void {
    this.loadCart();
  }

  private loadCart(): void {
    this.loading = true;

    this.cartService.getCart().subscribe({
      next: (response) => {
        const cart = response.data as CartDto;
        this.cartItems = cart.items ?? [];
        this.subtotal = cart.totalPrice ?? cart.subtotal ?? 0;
        this.loading = false;
      },
      error: () => {
        this.cartItems = [];
        this.subtotal = 0;
        this.loading = false;
      },
    });
  }

  handleAddressChange(value: PaymentAddressValue): void {
    this.address = value;
  }

  handlePaymentMethodChange(selection: PaymentMethodSelection): void {
    this.selectedPaymentMethod = selection.method;
    this.sameAsShipping = selection.sameAsShipping;
  }

  handleShippingResolved(price: number): void {
    this.shippingPrice = price;
  }

  submitCheckout(): void {
    const address = this.address;

    if (!address?.countryId || !address.governorateId || !address.districtId) {
      this.toasterService.showError('Select your country, city, and district first.');
      return;
    }

    if (!address.addressLine.trim() || address.addressLine.trim().length < 6) {
      this.toasterService.showError('Enter your address line first. It must be at least 6 characters.');
      return;
    }

    this.submitting = true;

    if (this.selectedPaymentMethod === 'cod') {
      this.orderService
        .placeCodOrder({
          countryId: address.countryId,
          governorateId: address.governorateId,
          districtId: address.districtId,
          addressLine: address.addressLine,
          paymentMethod: 'cod',
          shippingMethodCode: 'standard',
        })
        .subscribe({
          next: (response) => {
            this.toasterService.showsuccess('Order placed successfully.');
            this.cartService.refreshCartCount();
            this.router.navigate(['/main/order-review'], {
              state: {
                orderId: response.data?._id,
                addressLine: address.addressLine,
                countryName: address.countryName,
                governorateName: address.governorateName,
                districtName: address.districtName,
                items: this.cartItems,
                subtotal: this.subtotal,
                shipping: this.shippingPrice ?? 0,
                total: this.total,
                paymentMethod: 'cod',
              },
            });
            this.submitting = false;
          },
          error: (error) => {
            this.toasterService.showError(error?.error?.message ?? 'Unable to place order.');
            this.submitting = false;
          },
        });

      return;
    }

    this.paymentService
      .startPaymentSession({
        countryId: address.countryId,
        governorateId: address.governorateId,
        districtId: address.districtId,
        addressLine: address.addressLine,
        provider: this.selectedPaymentMethod === 'paymob' ? 'paymob' : 'stripe',
        shippingMethodCode: 'standard',
      })
      .subscribe({
        next: (response) => {
          const paymentSession = response.data;
          if (paymentSession.url) {
            window.open(paymentSession.url, '_blank', 'noopener,noreferrer');
          } else if (paymentSession.iframeUrl) {
            window.open(paymentSession.iframeUrl, '_blank', 'noopener,noreferrer');
          } else {
            this.toasterService.showsuccess('Payment session created.');
          }
          this.submitting = false;
        },
        error: (error) => {
          this.toasterService.showError(error?.error?.message ?? 'Unable to start payment session.');
          this.submitting = false;
        },
      });
  }

  clearAddress(): void {
    this.address = null;
    this.shippingPrice = null;
  }
}