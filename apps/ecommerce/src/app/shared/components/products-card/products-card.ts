import { Component, input, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ProductItem, SingleProduct } from '../../interfacers/products';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-products-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './products-card.html',
  styleUrl: './products-card.css',
})
export class ProductsCard {
  productid = input<string>('');
  name = input<string>('');
  url = input<string>('');
  oldprice = input<number>(0);
  newprice = input<number>(0);
}
