import { Component, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
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
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  @ViewChild('bestSellerSwiper') swiperEl!: ElementRef;
    categories =[
  {
    name:'garnier Micellar Water Face Cleanser & Daily Makeup Remover Clear 100 ml',
    url:'assests/pictures/landing-page/slider-product1.png',
        oldprice:'350',
    newprice:'299',
    rating:1.3,
    revierwersNumber:215,
    router:'#'
  },
    {
    name:'garnier Micellar Water Face Cleanser & Daily Makeup Remover Clear 100 ml',
    url:'assests/pictures/landing-page/slider-product2.png',
    router:'#',
    oldprice:'350',
    newprice:'299',
    rating:1.3,
    revierwersNumber:215
  },
  {
    name:'garnier Micellar Water Face Cleanser & Daily Makeup Remover Clear 100 ml',
    url:'assests/pictures/landing-page/slider-product3.png',
    router:'#',
    oldprice:'350',
    newprice:'299',
    rating:1.3,
    revierwersNumber:215
  },
  {
    name:'garnier Micellar Water Face Cleanser & Daily Makeup Remover Clear 100 ml',
    url:'assests/pictures/landing-page/slider-product4.png',
    router:'#',
    oldprice:'350',
    newprice:'299',
    rating:1.3,
    revierwersNumber:215
  },
  {
    name:'garnier Micellar Water Face Cleanser & Daily Makeup Remover Clear 100 ml',
    url:'assests/pictures/landing-page/slider-product5.png',
    router:'#',
    oldprice:'350',
    newprice:'299',
    rating:1.3,
    revierwersNumber:215
  },
    {
    name:'garnier Micellar Water Face Cleanser & Daily Makeup Remover Clear 100 ml',
    url:'assests/pictures/landing-page/slider-product4.png',
    router:'#',
    oldprice:'350',
    newprice:'299',
    rating:1.3,
    revierwersNumber:215
  },
  {
    name:'garnier Micellar Water Face Cleanser & Daily Makeup Remover Clear 100 ml',
    url:'assests/pictures/landing-page/slider-product3.png',
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






