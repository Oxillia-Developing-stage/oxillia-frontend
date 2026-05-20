import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { forkJoin, map } from 'rxjs';
import { LoadingSpinner } from '../../../../shared/components/ui/loading-spinner/loading-spinner';
import {
  ProductItem,
  SingleProduct,
} from '../../../../shared/interfacers/products';
import { ProductFaqItem, ProductReviewsData } from '../../../../shared/interfacers/reviews';
import { ProductService } from '../../product.service';
import { ProductDetailsHero } from '../../components/product-details/product-details-hero/product-details-hero';
import { ProductFaq } from '../../components/product-details/product-faq/product-faq';
import { ProductReviews } from '../../components/product-details/product-reviews/product-reviews';
import { ProductRelatedCarousels } from '../../components/product-details/product-related-carousels/product-related-carousels';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    LoadingSpinner,
    ProductDetailsHero,
    ProductFaq,
    ProductReviews,
    ProductRelatedCarousels,
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  private readonly _productService = inject(ProductService);
  private readonly _route = inject(ActivatedRoute);
  private readonly _cookies = inject(CookieService);

  readonly product = signal<SingleProduct | null>(null);
  readonly faqItems = signal<ProductFaqItem[]>([]);
  readonly reviewsData = signal<ProductReviewsData | null>(null);
  readonly brandProducts = signal<ProductItem[]>([]);
  readonly browsedProducts = signal<ProductItem[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading.set(false);
      return;
    }

    this._productService.getProductById(id).subscribe({
      next: (response) => {
        const product = response.data;
        this.product.set(product);
        this.loadSupplementaryData(product);
      },
      error: () => this.loading.set(false),
    });
  }

  private loadSupplementaryData(product: SingleProduct): void {
    const isAuthenticated = this._cookies.check('accessToken');

    forkJoin({
      faq: this._productService.getProductFaq(product._id),
      reviews: this._productService.getProductReviews(product._id),
      brandProducts: this._productService.getProductsByBrand(product.brand._id, product._id),
      browsed: isAuthenticated
        ? this._productService.getBrowsingHistory()
        : this._productService
            .getAllProducts(1, 8, '-createdAt')
            .pipe(map((res) => res.data ?? [])),
    }).subscribe({
      next: ({ faq, reviews, brandProducts, browsed }) => {
        this.faqItems.set(faq);
        this.reviewsData.set(reviews);
        this.brandProducts.set(brandProducts);
        this.browsedProducts.set(
          (browsed as ProductItem[]).filter((item) => item._id !== product._id).slice(0, 8),
        );
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onAddToCart(): void {
    // Hook into cart service when available
  }

  onCheckout(): void {
    // Hook into checkout flow when available
  }
}
