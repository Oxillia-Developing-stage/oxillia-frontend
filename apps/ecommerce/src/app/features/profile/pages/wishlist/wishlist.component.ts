import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  // Placeholder for wishlist logic
  wishlistItems = [
    { id: 1, name: 'Sample Product 1', price: 99.99 },
    { id: 2, name: 'Sample Product 2', price: 149.99 }
  ];
}
