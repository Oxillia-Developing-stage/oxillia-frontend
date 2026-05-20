import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SingleProductBrand } from '../../../../../../shared/interfacers/products';

@Component({
  selector: 'app-brand-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brand-header.html',
})
export class BrandHeader {
  brand = input.required<SingleProductBrand>();
}
