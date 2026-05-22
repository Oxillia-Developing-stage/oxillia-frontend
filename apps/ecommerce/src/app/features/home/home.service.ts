import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseUrl } from '@oxillia/features-auth';
import { Observable } from 'rxjs';
import { ProductRespone } from '../../shared/interfacers/products';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  _httpClient = inject(HttpClient);
  _BaseUrl = inject(BaseUrl);
  getBestSellers():Observable<ProductRespone>{
    return this._httpClient.get<ProductRespone>(`${this._BaseUrl}/products?page=1&limit=10&sort=-createdAt&isBestSeller=true`);
  }
}
