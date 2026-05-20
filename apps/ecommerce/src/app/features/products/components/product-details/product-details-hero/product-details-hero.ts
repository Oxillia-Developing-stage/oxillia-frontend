import { Component, input, output } from '@angular/core';
import { SingleProduct } from '../../../../../shared/interfacers/products';
import { ProductInfoTabs } from '../product-info-tabs/product-info-tabs';
import { ProductImageCarousel } from '../product-image-carousel/product-image-carousel';
import { ProductPurchasePanel } from '../product-purchase-panel/product-purchase-panel';

@Component({
  selector: 'app-product-details-hero',
  standalone: true,
  imports: [ProductInfoTabs, ProductImageCarousel, ProductPurchasePanel],
  templateUrl: './product-details-hero.html',
  styleUrl: './product-details-hero.css',
})
export class ProductDetailsHero {
  product = input.required<SingleProduct>();
  addToCart = output<void>();
  checkout = output<void>();
}
