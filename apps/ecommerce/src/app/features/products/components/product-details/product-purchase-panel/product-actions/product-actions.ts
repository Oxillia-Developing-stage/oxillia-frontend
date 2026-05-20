import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product-actions',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './product-actions.html',
  styleUrl: './product-actions.css',
})
export class ProductActions {
  disabled = input(false);
  addToCart = output<void>();
  checkout = output<void>();
}
