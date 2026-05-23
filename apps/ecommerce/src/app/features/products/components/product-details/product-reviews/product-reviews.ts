import { Component, input } from '@angular/core';
import { ProductReviewsData } from '../../../../../shared/interfacers/reviews';
import { ReviewSummary } from './review-summary/review-summary';
import { ReviewList } from './review-list/review-list';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [ReviewSummary, ReviewList],
  templateUrl: './product-reviews.html',
})
export class ProductReviews {
  data = input.required<ProductReviewsData>();
  ratingsAverage = input(0);
  ratingsQuantity = input(0);
}
