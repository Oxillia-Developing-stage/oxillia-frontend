import { Component, input } from '@angular/core';
@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [],
  templateUrl: './category-card.html',
  styleUrl: './category-card.css',
})
export class CategoryCard {
 image = input<string>('')
 name = input<string>('')
  
}
