export interface ProductRespone {
    success: boolean;
    statusCode: number;
    message: string;
    data: ProductItem[];
    pagination: ProductPagination;
  }
  
  export interface ProductItem {
    _id: string;
    name: string;
    images: string[];
    price: number;
    priceAfterDiscount: number | null;
    offerEndsAt: string | null;
    advantages: string;
    composition: string;
    stock: number;
    soldCount: number;
    category: ProductCategory;
    subCategory: ProductSubCategory[];
    brand: ProductBrand;
    concerns: string[];
    isSensitiveSkin: boolean;
    isBestSeller: boolean;
    isBundle: boolean;
    certificationImage: string | null;
    isCertified: boolean;
    isActive: boolean;
    views: number;
    ratingsAverage: number;
    ratingsQuantity: number;
    createdAt: string;
    updatedAt: string;
    slug: string;
  }
  
  export interface ProductCategory {
    _id: string;
    name: string;
    slug: string;
  }
  
  export interface ProductSubCategory {
    _id: string;
    name: string;
    slug: string;
  }
  
  export interface ProductBrand {
    _id: string;
    name: string;
    logo: string;
    slug: string;
  }
  
  export interface ProductPagination {
    currentPage: number;
    limit: number;
    numberOfPages: number;
    totalDocuments: number;
    nextPage: number | null;
    prevPage: number | null;
  }



  // single product 
  export interface SingleProductResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: SingleProduct;
}

export interface SingleProduct {
  _id: string;
  name: string;
  images: string[];
  price: number;
  priceAfterDiscount: number | null;
  offerEndsAt: string | null;
  description?: string;
  advantages: string;
  composition: string;
  stock: number;
  soldCount: number;
  category: SingleProductCategory;
  subCategory: SingleProductSubCategory[];
  brand: SingleProductBrand;
  concerns: string[];
  isSensitiveSkin: boolean;
  isBestSeller: boolean;
  isBundle: boolean;
  catalog: string | null;
  certificationImage: string | null;
  isCertified: boolean;
  isActive: boolean;
  views: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface SingleProductCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface SingleProductSubCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface SingleProductBrand {
  _id: string;
  name: string;
  logo: string;
  slug: string;
}