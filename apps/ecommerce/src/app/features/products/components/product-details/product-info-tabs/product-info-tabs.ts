import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { SingleProduct } from '../../../../../shared/interfacers/products';
import { parseProductContent } from '../../../utils/product-content.util';

type ProductTab = 'description' | 'advantages' | 'composition';

@Component({
  selector: 'app-product-info-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-info-tabs.html',
  styleUrl: './product-info-tabs.css',
})
export class ProductInfoTabs {
  product = input.required<SingleProduct>();
  activeTab = signal<ProductTab>('description');

  readonly tabs: { id: ProductTab; label: string }[] = [
    { id: 'description', label: 'Description' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'composition', label: 'Composition' },
  ];

  readonly descriptionContent = computed(() => {
    const product = this.product();
    if (product.description?.trim()) {
      return parseProductContent(product.description);
    }
    return parseProductContent(product.advantages);
  });

  readonly advantagesContent = computed(() => parseProductContent(this.product().advantages));
  readonly compositionContent = computed(() => parseProductContent(this.product().composition));

  readonly activeContent = computed(() => {
    switch (this.activeTab()) {
      case 'advantages':
        return this.advantagesContent();
      case 'composition':
        return this.compositionContent();
      default:
        return this.descriptionContent();
    }
  });

  setTab(tab: ProductTab): void {
    this.activeTab.set(tab);
  }
}
