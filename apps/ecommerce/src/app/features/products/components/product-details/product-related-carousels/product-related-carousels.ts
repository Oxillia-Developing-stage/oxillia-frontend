import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  Input,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { ProductItem } from '../../../../../shared/interfacers/products';
import { RelatedProductCard } from '../related-product-card/related-product-card';

register();

@Component({
  selector: 'app-product-related-carousels',
  standalone: true,
  imports: [CommonModule, RelatedProductCard],
  templateUrl: './product-related-carousels.html',
  styleUrl: './product-related-carousels.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { ngSkipHydration: '' },
})
export class ProductRelatedCarousels {
  @ViewChild('brandSwiper') brandSwiperEl?: ElementRef;
  @ViewChild('browsedSwiper') browsedSwiperEl?: ElementRef;

  @Input() brandName = '';
  @Input() brandProducts: ProductItem[] = [];
  @Input() browsedProducts: ProductItem[] = [];

  private readonly _platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this._platformId)) return;

    [this.brandSwiperEl, this.browsedSwiperEl].forEach((ref) => {
      const swiperEl = ref?.nativeElement;
      setTimeout(() => {
        if (swiperEl?.swiper) {
          swiperEl.swiper.update();
          swiperEl.swiper.pagination?.update();
          swiperEl.swiper.pagination?.render();
        }
      }, 100);
    });
  }
}
