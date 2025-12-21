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


}
