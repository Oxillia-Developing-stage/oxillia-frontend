import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductItem } from '../../../../../shared/interfacers/products';
import { getDisplayPrice } from '../../../utils/product-content.util';

@Component({
  selector: 'app-related-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: './related-product-card.html',
})
export class RelatedProductCard {
  product = input.required<ProductItem>();

  readonly pricing = computed(() => getDisplayPrice(this.product()));
}
