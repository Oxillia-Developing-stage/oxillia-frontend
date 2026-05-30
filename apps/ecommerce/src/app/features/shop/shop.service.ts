import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseUrl } from '@oxillia/features-auth';
import { Observable } from 'rxjs';
import { ProductItem, ProductRespone } from '../../shared/interfacers/products';
import { CategoryResponse } from '../../shared/interfacers/category';
import { BrandRespone } from '../../shared/interfacers/brand';
import { OfferResponse } from '../../shared/interfacers/offers';

export interface BannerItem {
  id: string;
  image: string;
  linkType: 'url' | 'product' | 'category' | 'none';
  title: string;
  externalUrl?: string;
  linkId?: string;
}

export interface BannerResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: BannerItem[];
}

export interface BrowsingHistoryItem {
  _id: string;
  product: ProductItem;
  category: string;
  viewedAt: string;
}

export interface BrowsingHistoryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: BrowsingHistoryItem[];
}
@Injectable({
  providedIn: 'root',
})
export class ShopService {
  _httpClient = inject(HttpClient);
  _baseUrl = inject(BaseUrl);
  getAllProducts(page = 1, limit = 10, sort = 'createdAt:desc', params?: Record<string, string | number | boolean | null | undefined>): Observable<ProductRespone>{
    const searchParams = new URLSearchParams();
    searchParams.set('page', String(page));
    searchParams.set('limit', String(limit));
    searchParams.set('sort', sort);
    if (params) {
      Object.keys(params).forEach((k) => {
        const v = params[k];
        if (v === null || typeof v === 'undefined') return;
        searchParams.set(k, String(v));
      });
    }
    return this._httpClient.get<ProductRespone>(`${this._baseUrl}/products?${searchParams.toString()}`);
  }

  getBanners(): Observable<BannerResponse> {
    return this._httpClient.get<BannerResponse>(`${this._baseUrl}/banners`);
  }

  getCategories(): Observable<CategoryResponse> {
    return this._httpClient.get<CategoryResponse>(`${this._baseUrl}/categories`);
  }
  getBrands(): Observable<BrandRespone> {
    return this._httpClient.get<BrandRespone>(`${this._baseUrl}/brands`);
  }
  getRecommendations() {
    return this._httpClient.get<ProductRespone>(`${this._baseUrl}/users/recommendations`);
  }
  getBrowesedHistory(){
    return this._httpClient.get<BrowsingHistoryResponse>(`${this._baseUrl}/users/browsing-history`);
  }
  getUpComingOffers(){
    return this._httpClient.get<OfferResponse>(`${this._baseUrl}/offers/upcoming`);
  }
}
