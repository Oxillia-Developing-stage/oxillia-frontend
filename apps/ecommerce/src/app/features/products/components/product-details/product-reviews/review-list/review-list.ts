import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { ProductReview } from '../../../../../../shared/interfacers/reviews';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [DatePipe, FormsModule, RatingModule, ButtonModule],
  templateUrl: './review-list.html',
  styleUrl: './review-list.css',
})
export class ReviewList {
  reviews = input<ProductReview[]>([]);
}
