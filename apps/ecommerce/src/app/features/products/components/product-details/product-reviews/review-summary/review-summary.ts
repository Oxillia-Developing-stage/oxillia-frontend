import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { RatingDistribution } from '../../../../../../shared/interfacers/reviews';

@Component({
  selector: 'app-review-summary',
  standalone: true,
  imports: [CommonModule, FormsModule, RatingModule, ProgressBarModule, ButtonModule],
  templateUrl: './review-summary.html',
  styleUrl: './review-summary.css',
})
export class ReviewSummary {
  average = input(0);
  total = input(0);
  distribution = input<RatingDistribution[]>([]);
}
