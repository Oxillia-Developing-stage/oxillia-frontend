import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService, CartDto, CartItem as CartLine } from './cart.service';
import { CartItemComponent } from './components/cart-item/cart-item';
import { OrderSummaryComponent } from './components/order-summary/order-summary';
import { Recommendations } from '../shop/components/recommendations/recommendations';
import { Browsed } from '../shop/components/browsed/browsed';
import { ProductItem } from '../../shared/interfacers/products';
import { BrowsingHistoryItem, ShopService } from '../shop/shop.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, CartItemComponent, OrderSummaryComponent, Recommendations, Browsed],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  readonly items = signal<CartLine[]>([]);
  readonly subtotal = signal(0);
  readonly loading = signal(true);
  readonly recommendedProducts = signal<ProductItem[]>([]);
  readonly browsedProducts = signal<ProductItem[]>([]);

  constructor(
    private readonly cartService: CartService,
    private readonly shopService: ShopService,
    private readonly cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.loadCart();
    this.loadShopSections();
  }

  loadCart(): void {
    this.loading.set(true);

    this.cartService.getCart().subscribe({
      next: (response) => {
        const cart = response.data as CartDto;
        this.items.set(cart.items ?? []);
        this.subtotal.set(cart.totalPrice ?? cart.subtotal ?? 0);
        this.loading.set(false);
      },
      error: () => {
        this.items.set([]);
        this.subtotal.set(0);
        this.loading.set(false);
      },
    });
  }

  private loadShopSections(): void {
    const isAuthenticated = this.cookieService.check('accessToken');

    if (isAuthenticated) {
      this.shopService.getRecommendations().subscribe({
        next: (res) => this.recommendedProducts.set(res.data ?? []),
      });

      this.shopService.getBrowesedHistory().subscribe({
        next: (res) => this.browsedProducts.set((res.data ?? []).map((item: BrowsingHistoryItem) => item.product)),
      });

      return;
    }

    this.shopService.getAllProducts(1, 10).subscribe({
      next: (res) => {
        const products = res.data ?? [];
        this.recommendedProducts.set(products.slice(0, 8));
        this.browsedProducts.set(products.slice(2, 10));
      },
      error: () => {
        this.recommendedProducts.set([]);
        this.browsedProducts.set([]);
      },
    });
  }
}