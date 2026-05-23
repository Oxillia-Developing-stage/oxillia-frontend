export interface ProductReview {
  _id: string;
  rating: number;
  title: string;
  body: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  helpfulCount: number;
}

export interface RatingDistribution {
  stars: number;
  percentage: number;
}

export interface ProductReviewsData {
  reviews: ProductReview[];
  distribution: RatingDistribution[];
}

export interface ProductReviewsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ProductReviewsData;
}

export interface ProductFaqItem {
  id: string;
  question: string;
  answer: string;
}
