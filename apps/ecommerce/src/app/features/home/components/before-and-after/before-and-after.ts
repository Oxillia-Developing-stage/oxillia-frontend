import { CarouselModule } from 'primeng/carousel';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-before-and-after',
  imports: [CarouselModule, CommonModule],
  templateUrl: './before-and-after.html',
  styleUrl: './before-and-after.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { ngSkipHydration: '' }
})
export class BeforeAndAfter {
@ViewChild('pc') carousel!: any;

people =[
  {
    name:'Karlen .M Andro',
    before_url:'assests/pictures/landing-page/before.png',
    after_url:'assests/pictures/landing-page/after.png',
  },
  {
    name:'Karlen .M Andro',
    before_url:'assests/pictures/landing-page/before.png',
    after_url:'assests/pictures/landing-page/after.png',
  },
  {
    name:'Karlen .M Andro',
    before_url:'assests/pictures/landing-page/before.png',
    after_url:'assests/pictures/landing-page/after.png',
  },
  {
    name:'Karlen .M Andro',
    before_url:'assests/pictures/landing-page/before.png',
    after_url:'assests/pictures/landing-page/after.png',
  },
  {
    name:'Karlen .M Andro',
    before_url:'assests/pictures/landing-page/before.png',
    after_url:'assests/pictures/landing-page/after.png',
  },
  {
    name:'Karlen .M Andro',
    before_url:'assests/pictures/landing-page/before.png',
    after_url:'assests/pictures/landing-page/after.png',
  },

]
responsiveOptions = [
  {
    breakpoint: '1200px',
    numVisible: 6,
    numScroll: 1
  },
  {
    breakpoint: '992px',
    numVisible: 5,
    numScroll: 1
  },
  {
    breakpoint: '768px',
    numVisible: 4,
    numScroll: 1
  },
  {
    breakpoint: '576px',
    numVisible: 3,
    numScroll: 1
  }
];
private _swiperEl!: ElementRef;

@ViewChild('beforeandAfter') set swiperEl(content: ElementRef) {
  if (content) {
    this._swiperEl = content;
    this.initializeSwiperOnClient(); // Initialize as soon as it exists
  }
}

get swiperEl(): ElementRef {
  return this._swiperEl;
}
initializeSwiperOnClient() {
  if (isPlatformBrowser(this.platformId)) {
    const swiperContainer = this._swiperEl.nativeElement;
    
    // Safety check: Don't initialize twice
    if (swiperContainer.initialized) return;

    const params = {
      pagination: { clickable: true },
      injectStyles: [`
        .swiper-pagination { position: static !important; width: auto !important; display: flex !important; gap: 8px; margin: 0 20px; }
        .swiper-pagination-bullet { width: 10px; height: 10px; background: var(--color-button-secondary, #ccc); opacity: 1; transition: all 0.3s ease; }
        .swiper-pagination-bullet-active { width: 30px; border-radius: 6px; background: var(--color-button-primary, #000); }
      `],
    };

    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }
}
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
    setTimeout(() => {
        if (!this.swiperEl) return;

        const swiperContainer = this.swiperEl.nativeElement;

        const params = {
          // Add pagination config here to ensure it's active
          pagination: {
            clickable: true,
          },
          injectStyles: [`
            .swiper-pagination {
              position: static !important;
              width: auto !important;
              display: flex !important;
              justify-content: center;
              align-items: center;
              gap: 8px;
              margin: 0 20px;
            }
            .swiper-pagination-bullet {
              width: 10px;
              height: 10px;
              background: var(--color-button-secondary, #ccc);
              opacity: 1;
              transition: all 0.3s ease;
            }
            .swiper-pagination-bullet-active {
              width: 30px;
              border-radius: 6px;
              background: var(--color-button-primary, #000);
            }
          `],
        };

        // 3. Assign params and initialize
        Object.assign(swiperContainer, params);
        swiperContainer.initialize();

        // 4. Force a refresh after a tiny delay to fix the "doesn't show until swipe" bug
        setTimeout(() => {
          if (swiperContainer.swiper) {
            swiperContainer.swiper.update();
          }
        }, 50);
      }, 0);
    }
  }
   slidePrev() {
    this.swiperEl.nativeElement.swiper.slidePrev();
  }

  slideNext() {
    this.swiperEl.nativeElement.swiper.slideNext();
  }
}