import { Component, input } from '@angular/core';
import { Offer } from 'apps/ecommerce/src/app/shared/interfacers/offers';
import { signal, computed } from '@angular/core';
@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [],
  templateUrl: './sale.html',
  styleUrl: './sale.css',
  host: { class: 'sale-banner-host' },
})
export class Sale {
  offer = input<Offer>();
   now = signal(Date.now());
  private timerId = setInterval(() => this.now.set(Date.now()), 1000);
 offerStatus = computed(() => {
  const time = this.now();
  const offer = this.offer();

  // FIX: If there is no offer data yet, don't say it's expired
  if (!offer) return 'PENDING'; 
  if (!offer.startDate || !offer.endDate) return 'EXPIRED';

  const start = new Date(offer.startDate).getTime();
  const end = new Date(offer.endDate).getTime();

  if (time < start) return 'LOCKED';
  if (time < end) return 'ACTIVE';
  return 'EXPIRED';
});
countdown = computed(() => {
  const status = this.offerStatus();
  const offer = this.offer();

  if (status === 'EXPIRED') return 'Offer has expired';
  if (!offer?.startDate || !offer?.endDate) return '';

  const target = status === 'LOCKED'
    ? new Date(offer.startDate).getTime()
    : new Date(offer.endDate).getTime();

  const diff = target - this.now();
  if (diff <= 0) return '00:00:00';

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
  const m = Math.floor((diff / (1000 * 60)) % 60).toString().padStart(2, '0');
  const s = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');

  // If more than 0 days, prefix with days count
  return d > 0 ? `${d}d ${h}:${m}:${s}` : `${h}:${m}:${s}`;
});
    ngOnDestroy() {
    clearInterval(this.timerId);
  }
}
