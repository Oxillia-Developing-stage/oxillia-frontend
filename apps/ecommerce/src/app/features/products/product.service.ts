import { inject, Injectable } from '@angular/core';
import { BaseUrl } from '@oxillia/features-auth';
import { map, Observable, of } from 'rxjs';
import {
  ProductItem,
  ProductRespone,
  SingleProductResponse,
} from '../../shared/interfacers/products';
import {
  ProductFaqItem,
  ProductReviewsData,
  ProductReviewsResponse,
} from '../../shared/interfacers/reviews';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _baseUrl = inject(BaseUrl);

  getProductById(id: string): Observable<SingleProductResponse> {
    return this._httpClient.get<SingleProductResponse>(`${this._baseUrl}/products/${id}`);
  }

  getAllProducts(
    page = 1,
    limit = 10,
    sort = '-createdAt',
    params?: Record<string, string | number | boolean | null | undefined>,
  ): Observable<ProductRespone> {
    const searchParams = new URLSearchParams();
    searchParams.set('page', String(page));
    searchParams.set('limit', String(limit));
    searchParams.set('sort', sort);

    if (params) {
      Object.keys(params).forEach((key) => {
        const value = params[key];
        if (value === null || typeof value === 'undefined') return;
        searchParams.set(key, String(value));
      });
    }

    return this._httpClient.get<ProductRespone>(
      `${this._baseUrl}/products?${searchParams.toString()}`,
    );
  }

  getProductsByBrand(
    brandId: string,
    excludeProductId?: string,
    limit = 8,
  ): Observable<ProductItem[]> {
    return this.getAllProducts(1, limit, '-createdAt', { brand: brandId }).pipe(
      map((res) =>
        (res.data ?? []).filter((product) => product._id !== excludeProductId).slice(0, limit),
      ),
    );
  }

  getBrowsingHistory(): Observable<ProductItem[]> {
    return this._httpClient
      .get<ProductRespone>(`${this._baseUrl}/users/browsing-history`)
      .pipe(map((res) => res.data ?? []));
  }

  /** Placeholder until reviews API is available */
  getProductReviews(productId: string): Observable<ProductReviewsData> {
    void productId;
    const mock: ProductReviewsResponse = {
      success: true,
      statusCode: 200,
      message: 'Reviews retrieved',
      data: {
        distribution: [
          { stars: 5, percentage: 85 },
          { stars: 4, percentage: 10 },
          { stars: 3, percentage: 3 },
          { stars: 2, percentage: 1 },
          { stars: 1, percentage: 1 },
        ],
        reviews: [
          {
            _id: '1',
            rating: 5,
            title: 'Life changing for my texture',
            body:
              'I have been using this for three weeks and my skin feels smoother, calmer, and more hydrated without any irritation.',
            authorName: 'Sarah M.',
            authorAvatar: 'https://i.pravatar.cc/80?img=5',
            createdAt: '2023-10-13T00:00:00.000Z',
            helpfulCount: 14,
          },
          {
            _id: '2',
            rating: 4,
            title: 'Great daily staple',
            body:
              'Absorbs quickly and layers well under sunscreen. Slight scent but nothing overpowering.',
            authorName: 'Amira K.',
            authorAvatar: 'https://i.pravatar.cc/80?img=9',
            createdAt: '2023-09-28T00:00:00.000Z',
            helpfulCount: 8,
          },
          {
            _id: '3',
            rating: 5,
            title: 'Visible glow in two weeks',
            body:
              'My dark spots look softer and the overall tone is more even. Will repurchase.',
            authorName: 'Lina R.',
            authorAvatar: 'https://i.pravatar.cc/80?img=16',
            createdAt: '2023-08-15T00:00:00.000Z',
            helpfulCount: 21,
          },
        ],
      },
    };

    return of(mock.data);
  }

  /** Placeholder until FAQ API is available */
  getProductFaq(productId: string): Observable<ProductFaqItem[]> {
    void productId;
    return of([
      {
        id: '1',
        question: 'Can I use this with Vitamin C',
        answer:
          'Yes, when layered correctly. Apply Vitamin C in the morning and this product afterward once absorbed, always finishing with SPF.',
      },
      {
        id: '2',
        question: 'Is this safe during pregnancy or breastfeeding?',
        answer:
          'Consult your specialist before use. We recommend reviewing the full ingredient list with your clinician.',
      },
      {
        id: '3',
        question: 'How long until I see visible results?',
        answer:
          'Most users notice improved hydration within 1–2 weeks. Tone and texture improvements typically appear after 4–6 weeks of consistent use.',
      },
    ]);
  }
}
