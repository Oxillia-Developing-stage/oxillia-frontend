import { Component, input } from '@angular/core';
import { ProductItem } from 'apps/ecommerce/src/app/shared/interfacers/products';

@Component({
  selector: 'app-product-accordin',
  imports: [],
  templateUrl: './product-accordin.html',
  styleUrl: './product-accordin.css',
})
export class ProductAccordin {
product = input<ProductItem>({} as ProductItem);
}
