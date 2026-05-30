import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OrderDto, OrderService, TrackOrderDto, TrackStepDto } from './order.service';

interface OrderOrdersState {
  orderId?: string;
}

interface StepViewModel {
  key: string;
  label: string;
  status: TrackStepDto['status'];
}

interface OrderCardViewModel extends OrderDto {
  displayNumber: string;
  displayDate: string;
  displayStatus: string;
  displayPaymentStatus: string;
  displayPaymentMethod: string;
  displayTrackingNumber: string;
  displayCarrier: string;
  displayAddress: string[];
  itemCount: number;
  totalPrice: number;
  productImages: string[];
}

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order implements OnInit {
  private readonly orderService = inject(OrderService);
  private readonly route = inject(ActivatedRoute);
  private readonly cookieService = inject(CookieService);

  loading = true;
  detailsLoading = false;
  searching = false;
  errorMessage = '';
  searchText = '';
  confirmationEmail = 'your email';

  orders: OrderCardViewModel[] = [];
  selectedOrder: OrderCardViewModel | null = null;
  selectedOrderId = '';

  ngOnInit(): void {
    const state = typeof window !== 'undefined' ? (window.history.state as OrderOrdersState | null) : null;
    const cookieEmail = this.cookieService.get('userEmail');
    if (cookieEmail) {
      this.confirmationEmail = cookieEmail;
    }
    this.selectedOrderId = state?.orderId || this.route.snapshot.queryParamMap.get('orderId') || '';
    this.loadOrders();
  }

  get searchButtonLabel(): string {
    return this.searching ? 'Searching...' : 'Search';
  }

  get filteredOrders(): OrderCardViewModel[] {
    const term = this.searchText.trim().toLowerCase();
    if (!term) {
      return this.orders;
    }

    return this.orders.filter((order) => {
      return [order.displayNumber, order.displayStatus, order.displayPaymentStatus, order.displayCarrier, order.displayTrackingNumber]
        .join(' ')
        .toLowerCase()
        .includes(term);
    });
  }

  get orderStats(): Array<{ label: string; value: string; tone: 'primary' | 'success' | 'warning' | 'info' }> {
    const pending = this.orders.filter((order) => this.mapOrderTone(order.orderStatus) === 'warning').length;
    const shipped = this.orders.filter((order) => this.mapOrderTone(order.orderStatus) === 'info').length;
    const delivered = this.orders.filter((order) => this.mapOrderTone(order.orderStatus) === 'success').length;

    return [
      { label: 'Total orders', value: `${this.orders.length}`, tone: 'primary' },
      { label: 'Pending', value: `${pending}`, tone: 'warning' },
      { label: 'Shipped', value: `${shipped}`, tone: 'info' },
      { label: 'Delivered', value: `${delivered}`, tone: 'success' },
    ];
  }

  selectOrder(orderId: string): void {
    if (!orderId || orderId === this.selectedOrderId) {
      return;
    }

    this.selectedOrderId = orderId;
    this.loadOrderDetails(orderId);
  }

  clearSearch(): void {
    this.searchText = '';
  }

  private loadOrders(): void {
    this.loading = true;
    this.errorMessage = '';

    this.orderService.getMyOrders().subscribe({
      next: (response) => {
        const list = (response.data ?? []).map((order) => this.toOrderCard(order));
        this.orders = list;

        const initialOrder = list.find((order) => order._id === this.selectedOrderId) ?? list[0] ?? null;
        this.selectedOrder = initialOrder;
        this.selectedOrderId = initialOrder?._id ?? '';

        if (this.selectedOrderId) {
          this.loadOrderDetails(this.selectedOrderId, false);
        }

        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error?.error?.message ?? 'Unable to load your orders right now.';
        this.loading = false;
      },
    });
  }

  private loadOrderDetails(orderId: string, updateSelected = true): void {
    this.detailsLoading = true;
    this.orderService.getMyOrder(orderId).subscribe({
      next: (response) => {
        const merged = this.toOrderCard(response.data, this.orders.find((order) => order._id === orderId));
        this.orders = this.orders.map((order) => (order._id === orderId ? merged : order));
        if (updateSelected || this.selectedOrderId === orderId) {
          this.selectedOrder = merged;
        }
        this.detailsLoading = false;
      },
      error: () => {
        this.detailsLoading = false;
      },
    });
  }

  private toOrderCard(order: OrderDto, fallback?: OrderCardViewModel): OrderCardViewModel {
    const createdAt = order.createdAt ?? fallback?.createdAt;
    const paymentMethod = order.paymentMethod ?? fallback?.paymentMethod;
    const orderStatus = order.orderStatus ?? fallback?.orderStatus ?? 'pending';
    const paymentStatus = order.paymentStatus ?? fallback?.paymentStatus ?? 'pending';
    const trackingNumber = order.tracking?.trackingNumber ?? order.shipment?.trackingNumber ?? fallback?.tracking?.trackingNumber ?? fallback?.shipment?.trackingNumber ?? '';
    const carrierName = order.shipment?.carrierName ?? fallback?.shipment?.carrierName ?? 'Unassigned';
    const addressLines = [
      order.shippingAddress?.governorateName,
      order.shippingAddress?.districtLabel,
      order.shippingAddress?.addressLine,
    ].filter((line): line is string => Boolean(line && line.trim().length > 0));
    const items = order.items ?? fallback?.items ?? [];
    const productImages = items
      .map((item) => item.product?.images?.[0])
      .filter((image): image is string => Boolean(image));

    return {
      ...fallback,
      ...order,
      displayNumber: this.formatOrderNumber(order._id),
      displayDate: this.formatDate(createdAt),
      displayStatus: order.statusLabel ?? this.mapStatusLabel(order.tracking?.phase ?? this.mapPhase(orderStatus)),
      displayPaymentStatus: order.paymentStatusLabel ?? this.mapPaymentStatusLabel(paymentMethod, paymentStatus),
      displayPaymentMethod: paymentMethod === 'card' ? 'Card payment' : 'Cash on delivery',
      displayTrackingNumber: trackingNumber || 'Pending',
      displayCarrier: carrierName,
      displayAddress: addressLines,
      itemCount: items.reduce((count, item) => count + (item.quantity ?? 0), 0),
      totalPrice: typeof order.total === 'number' ? order.total : fallback?.totalPrice ?? 0,
      productImages,
    };
  }

  private createFallbackSteps(phase: TrackOrderDto['tracking'] extends infer T ? T extends { phase?: infer P } ? P : never : never): StepViewModel[] {
    const phaseOrder = ['placed', 'handed_over', 'in_transit', 'delivered'] as const;
    const phaseIndex = phaseOrder.indexOf((phase ?? 'placed') as (typeof phaseOrder)[number]);

    return [
      { key: 'placed', label: 'Order placed', status: phaseIndex >= 0 ? 'completed' : 'active' },
      { key: 'handed_over', label: 'Picked up', status: phaseIndex >= 1 ? 'completed' : phaseIndex === 0 ? 'active' : 'upcoming' },
      { key: 'in_transit', label: 'On the way', status: phaseIndex >= 2 ? 'completed' : phaseIndex === 1 ? 'active' : 'upcoming' },
      { key: 'delivered', label: 'Delivered', status: phaseIndex >= 3 ? 'completed' : phaseIndex === 2 ? 'active' : 'upcoming' },
    ];
  }

  private mapPhase(orderStatus?: string): TrackOrderDto['tracking'] extends infer T ? T extends { phase?: infer P } ? P : never : never {
    switch (orderStatus) {
      case 'processing':
        return 'handed_over';
      case 'shipped':
        return 'in_transit';
      case 'delivered':
        return 'delivered';
      default:
        return 'placed';
    }
  }

  private mapStatusLabel(phase: TrackOrderDto['tracking'] extends infer T ? T extends { phase?: infer P } ? P : never : never): string {
    switch (phase) {
      case 'handed_over':
        return 'Picked up';
      case 'in_transit':
        return 'On the way';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Order placed';
    }
  }

  private mapPaymentStatusLabel(paymentMethod?: 'cod' | 'card', paymentStatus?: string): string {
    if (paymentStatus === 'refunded') {
      return 'Refunded';
    }

    if (paymentMethod === 'card') {
      return paymentStatus === 'paid' ? 'Paid' : 'Payment pending';
    }

    return paymentStatus === 'paid' ? 'Paid' : 'Pay on delivery';
  }

  trackingStepsFor(order: OrderCardViewModel | null): StepViewModel[] {
    if (!order) {
      return this.createFallbackSteps('placed');
    }

    if (Array.isArray(order.tracking?.steps) && order.tracking.steps.length > 0) {
      return order.tracking.steps.map((step) => ({
        key: step.key,
        label: step.label,
        status: step.status,
      }));
    }

    return this.createFallbackSteps(order.tracking?.phase ?? this.mapPhase(order.orderStatus));
  }

  mapOrderTone(orderStatus?: string): 'primary' | 'success' | 'warning' | 'info' {
    switch (orderStatus) {
      case 'delivered':
        return 'success';
      case 'processing':
      case 'shipped':
        return 'info';
      case 'cancelled':
        return 'warning';
      default:
        return 'primary';
    }
  }

  private formatOrderNumber(orderId: string): string {
    const normalized = orderId.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const suffix = normalized.slice(-5) || '89234';
    return `OX-${suffix}`;
  }

  private formatDate(value?: string): string {
    if (!value) {
      return 'Recently';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return 'Recently';
    }

    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}