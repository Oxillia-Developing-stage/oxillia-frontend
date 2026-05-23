import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { SingleProduct } from '../../../../../../shared/interfacers/products';
import { getDisplayPrice, getEstimatedDeliveryDate } from '../../../../utils/product-content.util';

@Component({
  selector: 'app-price-section',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RatingModule, FormsModule],
  templateUrl: './price-section.html',
})
export class PriceSection {
  product = input.required<SingleProduct>();

  readonly pricing = computed(() => getDisplayPrice(this.product()));
  readonly deliveryDate = computed(() => getEstimatedDeliveryDate());
}
