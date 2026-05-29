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

  trackMyOrder(orderId: string): Observable<ApiResponse<unknown>> {
    return this.http.get<ApiResponse<unknown>>(`${this.baseUrl}/track/order/${orderId}`);
  }

  trackByNumber(trackingNumber: string): Observable<ApiResponse<unknown>> {
    return this.http.get<ApiResponse<unknown>>(
      `${this.baseUrl}/track/${encodeURIComponent(trackingNumber)}`,
    );
  }
}