import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, input, PLATFORM_ID, signal } from '@angular/core';
@Component({
  selector: 'app-product-image-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-image-carousel.html',
  styleUrl: './product-image-carousel.css',
  host: { ngSkipHydration: '' },
})
export class ProductImageCarousel {
  images = input<string[]>([]);
  activeIndex = signal(0);
  private readonly _platformId = inject(PLATFORM_ID);

  get isBrowser(): boolean {
    return isPlatformBrowser(this._platformId);
  }

  setActiveIndex(index: number): void {
    const total = this.images().length;
    if (!total) return;
    this.activeIndex.set((index + total) % total);
  }

  prev(): void {
    this.setActiveIndex(this.activeIndex() - 1);
  }

  next(): void {
    this.setActiveIndex(this.activeIndex() + 1);
  }
}
