import { Component, input, output } from '@angular/core';
import { SingleProduct } from '../../../../../shared/interfacers/products';
import { BrandHeader } from './brand-header/brand-header';
import { PriceSection } from './price-section/price-section';
import { MediaGallery } from './media-gallery/media-gallery';
import { ProductActions } from './product-actions/product-actions';

@Component({
  selector: 'app-product-purchase-panel',
  standalone: true,
  imports: [BrandHeader, PriceSection, MediaGallery, ProductActions],
  templateUrl: './product-purchase-panel.html',
  styleUrl: './product-purchase-panel.css',
})
export class ProductPurchasePanel {
  product = input.required<SingleProduct>();
  addToCart = output<void>();
  checkout = output<void>();
}
