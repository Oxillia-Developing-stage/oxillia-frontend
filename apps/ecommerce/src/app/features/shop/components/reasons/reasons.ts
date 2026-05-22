import { Component } from '@angular/core';
import { ReasonsCard } from '../../../../shared/components/reasons-card/reasons-card';

type ReasonCardTone = 'warm' | 'gold' | 'dark' | 'sale' | 'cool';
type ReasonCardSize = 'default' | 'tall' | 'wide';

interface ReasonCardItem {
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  tone: ReasonCardTone;
  size: ReasonCardSize;
  className: string;
}

@Component({
  selector: 'app-reasons',
  standalone: true,
  imports: [ReasonsCard],
  templateUrl: './reasons.html',
  styleUrl: './reasons.css',
})
export class Reasons {
  readonly cards: ReasonCardItem[] = [
    {
      title: 'New Arrivals',
      subtitle: 'Fresh takes you almost need',
      image: '/assests/pictures/shop-page/newArrival (1).png',
      alt: 'New arrivals skincare products',
      tone: 'warm',
      size: 'default',
      className: 'reasons-layout__card--new-arrivals',
    },
    {
      title: 'Best Sellers',
      subtitle: 'Fill your cart',
      image: '/assests/pictures/shop-page/Bestseller.png',
      alt: 'Best selling skincare products',
      tone: 'gold',
      size: 'default',
      className: 'reasons-layout__card--best-sellers',
    },
    {
      title: 'Top Rated',
      subtitle: 'Stay in trend',
      image: '/assests/pictures/shop-page/topRated.png',
      alt: 'Top rated skincare products',
      tone: 'dark',
      size: 'tall',
      className: 'reasons-layout__card--top-rated',
    },
    {
      title: 'Offers & Discounts',
      subtitle: 'Discover Oxillia deals',
      image: '/assests/pictures/shop-page/OffersDiscounts.png',
      alt: 'Discounted skincare products',
      tone: 'sale',
      size: 'wide',
      className: 'reasons-layout__card--offers',
    },
    {
      title: 'Dermatologist recommended',
      subtitle: 'Doctor recommended skincare',
      image: '/assests/pictures/shop-page/DoctorRecommendation.png',
      alt: 'Dermatologist recommended skincare products',
      tone: 'cool',
      size: 'wide',
      className: 'reasons-layout__card--dermatologist',
    },
  ];
}
