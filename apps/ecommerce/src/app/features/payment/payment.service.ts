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

export interface PaymentSessionBody {
  countryId: string;
  governorateId: string;
  districtId: string;
  addressLine: string;
  provider: 'stripe' | 'paymob';
  shippingMethodCode: string;
}

export interface PaymentSessionDto {
  _id: string;
  status: 'pending' | 'completed' | 'failed';
  order?: {
    _id: string;
  };
  url?: string;
  iframeUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(BaseUrl);

  startPaymentSession(body: PaymentSessionBody): Observable<ApiResponse<PaymentSessionDto>> {
    return this.http.post<ApiResponse<PaymentSessionDto>>(
      `${this.baseUrl}/orders/payment-session`,
      body,
    );
  }

  getPaymentSession(sessionId: string): Observable<ApiResponse<PaymentSessionDto>> {
    return this.http.get<ApiResponse<PaymentSessionDto>>(
      `${this.baseUrl}/orders/payment-session/${sessionId}`,
    );
  }
}