import { CommonModule, CurrencyPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { ProductItem } from '../../../../shared/interfacers/products';
import { ProductsCard } from "apps/ecommerce/src/app/shared/components/products-card/products-card";

register();

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, ProductsCard],
  templateUrl: './recommendations.html',
  styleUrl: './recommendations.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { ngSkipHydration: '' },
})
export class Recommendations {
  @ViewChild('recommendationsSwiper') swiperEl!: ElementRef;
  private readonly _platformId = inject(PLATFORM_ID);

  @Input() products: ProductItem[] = [];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this._platformId)) {
      return;
    }

    const swiperEl = this.swiperEl?.nativeElement;
    setTimeout(() => {
      if (swiperEl?.swiper) {
        swiperEl.swiper.update();
        swiperEl.swiper.pagination?.update();
        swiperEl.swiper.pagination?.render();
      }
    }, 100);
  }
}
