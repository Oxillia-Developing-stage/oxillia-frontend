import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {register} from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-landing-silder',
  imports: [ CommonModule, CurrencyPipe],
  templateUrl: './landing-silder.html',
  styleUrl: './landing-silder.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingSilder {




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
  }
]


}