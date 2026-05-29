import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { ProductItem } from 'apps/ecommerce/src/app/shared/interfacers/products';
import { ProductsCard } from 'apps/ecommerce/src/app/shared/components/products-card/products-card';

register();

@Component({
  selector: 'app-browsed',
  standalone: true,
  imports: [CommonModule, ProductsCard],
  templateUrl: './browsed.html',
  styleUrl: './browsed.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { ngSkipHydration: '' },
})
export class Browsed {
  @ViewChild('browsedSwiper') swiperEl!: ElementRef;
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
