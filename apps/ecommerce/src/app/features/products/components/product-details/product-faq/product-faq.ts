import { Component, input } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { ProductFaqItem } from '../../../../../shared/interfacers/reviews';

@Component({
  selector: 'app-product-faq',
  standalone: true,
  imports: [AccordionModule, ButtonModule],
  templateUrl: './product-faq.html',
  styleUrl: './product-faq.css',
})
export class ProductFaq {
  items = input<ProductFaqItem[]>([]);
}
