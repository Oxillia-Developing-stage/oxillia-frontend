import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { BannerItem, ShopService } from '../../shop.service';

register();

@Component({
  selector: 'app-banner',
  imports: [CommonModule],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { ngSkipHydration: '' },
})
export class Banner {
  @ViewChild('bannerSwiper') swiperEl!: ElementRef;
  private readonly _shopService = inject(ShopService);
  private readonly _router = inject(Router);
  private readonly _platformId = inject(PLATFORM_ID);

  banners = signal<BannerItem[]>([]);

  ngOnInit(): void {
    this._shopService.getBanners().subscribe({
      next: (res) => {
        this.banners.set(res.data ?? []);
        setTimeout(() => {
          const swiperEl = this.swiperEl?.nativeElement;
          if (swiperEl?.swiper) {
            swiperEl.swiper.update();
          }
        }, 100);
      },
    });
  }
  
  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this._platformId)) return;
  }

  onBannerClick(banner: BannerItem): void {
    if (banner.linkType === 'url' && banner.externalUrl) {
      if (isPlatformBrowser(this._platformId)) {
        window.open(banner.externalUrl, '_blank', 'noopener,noreferrer');
      }
      return;
    }

    if (banner.linkType === 'product' && banner.linkId) {
      this._router.navigate(['/products', banner.linkId]);
      return;
    }

    if (banner.linkType === 'category' && banner.linkId) {
      this._router.navigate(['/categories', banner.linkId]);
    }
  }

}
