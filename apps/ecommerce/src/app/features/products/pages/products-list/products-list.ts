import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { ShopService } from '../../../shop/shop.service';
import { FiltersService } from '../../../filter-page/filters-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsCard } from '../../../../shared/components/products-card/products-card';
import { ProductsFilter } from '../../components/products-filter/products-filter';
import { LoadingSpinner } from '../../../../shared/components/ui/loading-spinner/loading-spinner';
import { ProductItem, ProductRespone } from '../../../../shared/interfacers/products';
import { CategoryItem } from '../../../../shared/interfacers/category';
import { BrandItme } from '../../../../shared/interfacers/brand';
import { CookieService } from 'ngx-cookie-service';
import { BrowsingHistoryItem } from '../../../shop/shop.service';

type QueryParamValue = string;
type FilterValue = string | number | boolean | null | undefined;
type FilterParams = Record<string, FilterValue>;
type PageChangeEvent = { page?: number; rows?: number };

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule,
     FormsModule,
      PaginatorModule,
       CheckboxModule, InputNumberModule,
        ProductsCard, ProductsFilter, LoadingSpinner,
    ],
  templateUrl: './products-list.html',
  styleUrls: ['./products-list.scss'],
})
export class ProductsList implements OnInit {
  initialFilters: Record<string, QueryParamValue> | null = null;
  products: ProductRespone | null = null;
  page = 1;
  limit = 10;
  total = 0;
  loading = signal(false);
  // filter state
  searchKeyword = '';
  categories: CategoryItem[] = [];
  brands: BrandItme[] = [];
  selectedCategoryIds: string[] = [];
  selectedBrandIds: string[] = [];
  selectedConcerns: string[] = [];
  isSensitive = false;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  allOffers = false;
  todayOffers = false;

  broswedItems : ProductItem[] = [];
  reocommdations : ProductItem[] = [];

  constructor(private shop: ShopService, private filters: FiltersService, private route: ActivatedRoute, private router: Router) {}
    private readonly _CookiesService = inject(CookieService);
    isAuthenticated() {
	return this._CookiesService.check('accessToken');
}	
  private finishLoading(): void {
    this.loading.set(false);
  }

  private applyProductsResponse(res: ProductRespone): void {
    setTimeout(() => {
      this.products = res;
      this.total = res?.pagination?.totalDocuments ?? res?.data?.length ?? 0;
    }, 0);
  }

  private applyMetaItems<T>(assign: (value: T[]) => void, items: T[]): void {
    setTimeout(() => {
      assign(items);
    }, 0);
  }

  ngOnInit(): void {
    this.isAuthenticated();
    this.loadMeta();
    // read URL params for initial filter state
    this.route.queryParamMap.subscribe((qp) => {
      const params: Record<string, QueryParamValue> = {};
      qp.keys.forEach((k) => (params[k] = qp.getAll(k).length > 1 ? qp.getAll(k).join(',') : qp.get(k) ?? ''));
      this.initialFilters = params;
      // if there are any query params, load with them
      const hasParams = Object.keys(params).length > 0;
      if (hasParams) {
        this.onFiltersChange(params);
      } else {
        this.loadProducts();
      }
    });
  }

  loadMeta() {
    this.shop.getCategories().subscribe((c) => this.applyMetaItems((items) => (this.categories = items), c?.data || []));
    this.shop.getBrands().subscribe((b) => this.applyMetaItems((items) => (this.brands = items), b?.data || []));
    if(this.isAuthenticated()){
    this.shop.getBrowesedHistory().subscribe((res) => {
      this.applyMetaItems((items) => (this.broswedItems = items), (res?.data || []).map((item: BrowsingHistoryItem) => item.product));
    });
    this.shop.getRecommendations().subscribe((res) => {
      this.applyMetaItems((items) => (this.reocommdations = items), res?.data || []);
    });
  }
  }

  buildParams() {
    const params: FilterParams = {};
    const kw = this.filters.buildKeywordFilter(this.searchKeyword);
    if (kw) Object.assign(params, kw);
    const cat = this.filters.buildCategoryFilter(this.selectedCategoryIds);
    if (cat) Object.assign(params, cat);
    const brand = this.filters.buildBrandFilter(this.selectedBrandIds);
    if (brand) Object.assign(params, brand);
    const concerns = this.filters.buildConcernsFilter(this.selectedConcerns);
    if (concerns) Object.assign(params, concerns);
    const sensitive = this.filters.buildSensitivityFilter(this.isSensitive);
    if (sensitive) Object.assign(params, sensitive);
    const price = this.filters.buildPriceRangeFilter(this.minPrice, this.maxPrice);
    if (price) Object.assign(params, price);
    const offers = this.filters.buildOffersFilter({ allOffers: this.allOffers, todayOffers: this.todayOffers });
    if (offers) Object.assign(params, offers);
    return params;
  }

  loadProducts() {
    this.loading.set(true);
    const params = this.buildParams();
    this.shop.getAllProducts(this.page, this.limit, '-createdAt', params).subscribe({
      next: (res) => {
        this.applyProductsResponse(res);
        this.finishLoading();
      },
      error: () => this.finishLoading(),
    });
  }

  

  onPageChange(event: PageChangeEvent) {
    const pageIndex = event.page ?? 0;
    this.page = pageIndex + 1;
  if (event.rows) {
      this.limit = event.rows;
    }
    this.loadProducts();
  }

  onFiltersChange(params: Record<string, FilterValue>) {
    // update URL
    this.router.navigate([], { queryParams: params, queryParamsHandling: 'merge' });
    // fetch first page with new params
    this.page = 1;
    this.loading.set(true);
    const sort = typeof params.sort === 'string' && params.sort ? params.sort : '-createdAt';
    this.shop.getAllProducts(this.page, this.limit, sort, params).subscribe({
      next: (res) => {
        this.applyProductsResponse(res);
        this.finishLoading();
      },
      error: () => this.finishLoading(),
    });
  }
}
