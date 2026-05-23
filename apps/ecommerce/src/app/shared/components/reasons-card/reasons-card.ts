import { Component, input } from '@angular/core';

@Component({
  selector: 'app-reasons-card',
  standalone: true,
  templateUrl: './reasons-card.html',
  styleUrl: './reasons-card.css',
})
export class ReasonsCard {
  title = input<string>('');
  subtitle = input<string>('');
  image = input<string>('');
  alt = input<string>('');
  tone = input<'warm' | 'gold' | 'dark' | 'sale' | 'cool'>('warm');
  size = input<'default' | 'tall' | 'wide'>('default');
}
