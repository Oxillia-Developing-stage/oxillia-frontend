import { Component, ViewChild, ElementRef, Inject, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-landing-silder',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './landing-silder.html',
  styleUrl: './landing-silder.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { ngSkipHydration: '' }
})
export class LandingSilder {
   private platformId: Object = inject(PLATFORM_ID);
    // constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  @ViewChild('bestSellerSwiper') swiperEl!: ElementRef;
    categories =[
  {
    name:'Oxxila Acne Treatment Cream  100 ml',
    url:'assests/pictures/landing-page/acne-1.png',
        oldprice:'350',
    newprice:'299',
    rating:1.3,
    revierwersNumber:215,
    router:'#'
  },
    {
    name:'Oxxila Acne Toner  100 ml',
    url:'assests/pictures/landing-page/toner-2.png',
    router:'#',
    oldprice:'350',
    newprice:'299',
    rating:1.3,
    revierwersNumber:215
  },
  {
    name:'Oxxila Light Hydrating & Pore-Refining Cream  100 ml',
    url:'assests/pictures/landing-page/lighting-3.png',
    router:'#',
    oldprice:'350',
    newprice:'299',
    rating:1.3,
    revierwersNumber:215
  },
  {
    name:'Oxxila Cleanser Water Face Cleanser  100 ml',
    url:'assests/pictures/landing-page/cleanser-4.png',
    router:'#',
    oldprice:'350',
    newprice:'299',
    rating:1.3,
    revierwersNumber:215
  },
  {
    name:'Oxxila Niacinamide Serum for Acne-Prone Skin  100 ml',
    url:'assests/pictures/landing-page/serum-5.png',
    router:'#',
    oldprice:'350',
    newprice:'299',
    rating:1.3,
    revierwersNumber:215
  },
    {
    name:'Oxxila Acne Treatment Cream  100 ml',
    url:'assests/pictures/landing-page/acne-1.png',
    router:'#',
    oldprice:'350',
    newprice:'299',
    rating:1.3,
    revierwersNumber:215
  },
  {
    name:'Oxxila Cleanser Water Face Cleanser  100 ml',
    url:'assests/pictures/landing-page/cleanser-4.png',
    router:'#',
    oldprice:'350',
    newprice:'299',
    rating:1.3,
    revierwersNumber:215
  }
]
ngAfterViewInit() {

  if (!isPlatformBrowser(this.platformId)) {
    return;
  }
 if (isPlatformBrowser(this.platformId)) {
    const swiperEl = this.swiperEl.nativeElement;

    // Use a small delay to ensure the DOM is fully stable
    setTimeout(() => {
      if (swiperEl.swiper) {
        swiperEl.swiper.update(); // Recalculates everything
        swiperEl.swiper.pagination?.update(); // Force pagination dots to show
        swiperEl.swiper.pagination?.render();
      }
    }, 100);
  }
}
}






