export interface OfferResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Offer;
}

export interface Offer {
  _id: string;
  product: Offers_Product;
  discountPercent: number;
  discountAmount: number;
  productCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Offers_Product {
  _id: string;
  name: string;
  images: string[];
  price: number;
  slug: string;
}