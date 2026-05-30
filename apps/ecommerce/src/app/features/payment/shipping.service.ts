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

export interface ShippingCountry {
  _id: string;
  name: string;
  isActive?: boolean;
}

export interface ShippingGovernorate {
  _id: string;
  name: string;
  shippingPrice?: number;
  isActive?: boolean;
}

export interface ShippingDistrict {
  _id: string;
  name: string;
  shippingPrice?: number;
  isCovered?: boolean;
  isOther?: boolean;
}

export interface ShippingZonesResponse {
  hasDistricts: boolean;
  districts: ShippingDistrict[];
  other?: {
    label: string;
    shippingPrice: number;
  };
}

export interface ShippingResolveResponse {
  shippingPrice: number;
  isOther: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ShippingService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(BaseUrl);

  getCountries(): Observable<ApiResponse<ShippingCountry[]>> {
    return this.http.get<ApiResponse<ShippingCountry[]>>(`${this.baseUrl}/shipping/countries`);
  }

  getGovernorates(countryId: string): Observable<ApiResponse<ShippingGovernorate[]>> {
    return this.http.get<ApiResponse<ShippingGovernorate[]>>(
      `${this.baseUrl}/shipping/countries/${countryId}/governorates`,
    );
  }

  getZones(governorateId: string): Observable<ApiResponse<ShippingZonesResponse>> {
    return this.http.get<ApiResponse<ShippingZonesResponse>>(
      `${this.baseUrl}/shipping/governorates/${governorateId}/zones`,
    );
  }

  resolveShippingPrice(governorateId: string, districtId: string): Observable<ApiResponse<ShippingResolveResponse>> {
    return this.http.get<ApiResponse<ShippingResolveResponse>>(`${this.baseUrl}/shipping/resolve`, {
      params: { governorateId, districtId },
    });
  }
}