import { Component, input } from '@angular/core';
@Component({
  selector: 'app-brand-card',
  standalone: true,
  imports: [],
  templateUrl: './brand-card.html',
  styleUrl: './brand-card.css',
})
export class BrandCard {
image = input<string>('');
name = input<string>('');
}
