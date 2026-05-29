import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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

export interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    images: string[];
    price: number;
    priceAfterDiscount: number | null;
    stock: number;
    isActive: boolean;
  };
  quantity: number;
  price: number;
}

export interface CartDto {
  _id?: string;
  items: CartItem[];
  couponCode?: string | null;
  discountAmount?: number;
  storeCreditBalance?: number;
  storeCreditApplied?: number;
  totalItems?: number;
  subtotal?: number;
  totalPrice?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(BaseUrl);
  private readonly _cartCount$ = new BehaviorSubject<number>(0);

  // observable that other components can subscribe to for cart count
  readonly cartCount$ = this._cartCount$.asObservable();

  getCart(): Observable<ApiResponse<CartDto>> {
    return this.http.get<ApiResponse<CartDto>>(`${this.baseUrl}/cart`);
  }

  addItem(productId: string, quantity: number): Observable<ApiResponse<CartDto>> {
    return this.http.post<ApiResponse<CartDto>>(`${this.baseUrl}/cart`, { productId, quantity }).pipe(
      tap(() => this.refreshCartCount())
    );
  }

  updateItem(itemId: string, quantity: number): Observable<ApiResponse<CartDto>> {
    return this.http.put<ApiResponse<CartDto>>(`${this.baseUrl}/cart/${itemId}`, { quantity }).pipe(
      tap(() => this.refreshCartCount())
    );
  }

  removeItem(itemId: string): Observable<ApiResponse<CartDto>> {
    return this.http.delete<ApiResponse<CartDto>>(`${this.baseUrl}/cart/${itemId}`).pipe(
      tap(() => this.refreshCartCount())
    );
  }

  applyCoupon(code: string): Observable<ApiResponse<CartDto>> {
    return this.http.post<ApiResponse<CartDto>>(`${this.baseUrl}/cart/coupon`, { code });
  }

  removeCoupon(): Observable<ApiResponse<CartDto>> {
    return this.http.delete<ApiResponse<CartDto>>(`${this.baseUrl}/cart/coupon`);
  }

  clearCart(): Observable<ApiResponse<CartDto>> {
    return this.http.delete<ApiResponse<CartDto>>(`${this.baseUrl}/cart`);
  }

  // fetch current cart and update the cart count observable
  refreshCartCount(): void {
    this.getCart().subscribe({
      next: (res) => {
        const count = res.data?.totalItems ?? res.data?.items?.reduce((s, i) => s + (i.quantity ?? 0), 0) ?? 0;
        this._cartCount$.next(count);
      },
      error: () => this._cartCount$.next(0),
    });
  }
}