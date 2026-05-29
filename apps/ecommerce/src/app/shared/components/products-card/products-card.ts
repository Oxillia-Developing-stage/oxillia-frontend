import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../../../features/cart/cart.service';
import { ToasterService } from '../toaster/toaster-service';
@Component({
  selector: 'app-products-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products-card.html',
  styleUrl: './products-card.css',
})
export class ProductsCard {
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);
  private readonly toasterService = inject(ToasterService);

  productid = input<string>('');
  name = input<string>('');
  url = input<string>('');
  oldprice = input<number>(0);
  newprice = input<number>(0);
  readonly addedToCart = signal(false);

  onAddToCartClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.cookieService.check('accessToken')) {
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: this.router.url },
      });
      return;
    }

    const productId = this.productid();
    if (!productId) {
      this.toasterService.showError('Unable to add this item to cart.');
      return;
    }

    this.cartService.addItem(productId, 1).subscribe({
      next: () => {
        this.addedToCart.set(true);
        this.toasterService.showsuccess('Added to cart successfully.');
      },
      error: (error) => this.toasterService.showError(error?.error?.message ?? 'Unable to add this item to cart.'),
    });
  }
}
