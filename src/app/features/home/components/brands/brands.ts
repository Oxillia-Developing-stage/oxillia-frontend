import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-brands',
  imports: [CarouselModule, CommonModule],
  templateUrl: './brands.html',
  styleUrl: './brands.scss',
})
export class Brands {
brands = [
  {
    name: 'Google',
    url: 'https://www.google.com',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg'
  },
  {
    name: 'Apple',
    url: 'https://www.apple.com',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/apple.svg'
  },
  {
    name: 'Amazon',
    url: 'https://www.amazon.com',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg'
  },
  {
    name: 'Netflix',
    url: 'https://www.netflix.com',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/netflix.svg'
  },
  {
    name: 'Microsoft',
    url: 'https://www.microsoft.com',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoft.svg'
  },
];

categories =[
  {
    name:'Acne',
    url:'assests/pictures/landing-page/acne.png',
    router:'#'
  },
    {
    name:'Pigmentation',
    url:'assests/pictures/landing-page/pigmentation.png',
    router:'#'
  },
  {
    name:'Sensitive Skin',
    url:'assests/pictures/landing-page/sensitiveSkin.png',
    router:'#'
  },
  {
    name:'Drought',
    url:'assests/pictures/landing-page/drought.png',
    router:'#'
  },
  {
    name:'wrinkles',
    url:'assests/pictures/landing-page/wrinkles.png',
    router:'#'
  },
  {
    name:'Wide Purse',
    url:'assests/pictures/landing-page/widePurse.png',
    router:'#'
  }
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
}
