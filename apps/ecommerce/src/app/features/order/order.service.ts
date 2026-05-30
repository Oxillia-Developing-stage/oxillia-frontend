import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from '@oxillia/features-auth';

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface OrderBody {
  countryId: string;
  governorateId: string;
  districtId: string;
  addressLine: string;
  paymentMethod: 'cod';
  shippingMethodCode: string;
}

export interface OrderDto {
  _id: string;
  orderStatus?: string;
  paymentStatus?: string;
  paymentMethod?: 'cod' | 'card';
  statusLabel?: string;
  paymentStatusLabel?: string;
  total?: number;
  createdAt?: string;
  updatedAt?: string;
  shippingAddress?: {
    governorateName?: string;
    districtLabel?: string;
    addressLine?: string;
  };
  shipment?: {
    carrierName?: string;
    trackingNumber?: string;
    status?: string;
    providerStateLabel?: string;
  };
  tracking?: {
    phase?: 'placed' | 'handed_over' | 'in_transit' | 'delivered';
    trackingNumber?: string;
    steps?: TrackStepDto[];
  };
  items?: Array<{
    quantity?: number;
    price?: number;
    product?: {
      name?: string;
      images?: string[];
    };
  }>;
}

export interface TrackStepDto {
  key: string;
  label: string;
  status: 'completed' | 'active' | 'upcoming';
}

export interface TrackOrderDto {
  orderId: string;
  orderStatus?: string;
  statusLabel?: string;
  paymentStatus?: string;
  paymentStatusLabel?: string;
  paymentMethod?: 'cod' | 'card';
  total?: number;
  shippingAddress?: {
    governorateName?: string;
    districtLabel?: string;
  };
  shipment?: {
    carrierName?: string;
    trackingNumber?: string;
    status?: string;
    providerStateLabel?: string;
  };
  tracking?: {
    phase?: 'placed' | 'handed_over' | 'in_transit' | 'delivered';
    trackingNumber?: string;
    steps?: TrackStepDto[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(BaseUrl);

  placeCodOrder(body: OrderBody): Observable<ApiResponse<OrderDto>> {
    return this.http.post<ApiResponse<OrderDto>>(`${this.baseUrl}/orders`, body);
  }

  getMyOrders(): Observable<ApiResponse<OrderDto[]>> {
    return this.http.get<ApiResponse<OrderDto[]>>(`${this.baseUrl}/orders/my-orders`);
  }

  getMyOrder(orderId: string): Observable<ApiResponse<OrderDto>> {
    return this.http.get<ApiResponse<OrderDto>>(`${this.baseUrl}/orders/my-orders/${orderId}`);
  }

  trackMyOrder(orderId: string): Observable<ApiResponse<TrackOrderDto>> {
    return this.http.get<ApiResponse<TrackOrderDto>>(`${this.baseUrl}/track/order/${orderId}`);
  }

  trackByNumber(trackingNumber: string): Observable<ApiResponse<TrackOrderDto>> {
    return this.http.get<ApiResponse<TrackOrderDto>>(
      `${this.baseUrl}/track/${encodeURIComponent(trackingNumber)}`,
    );
  }
}