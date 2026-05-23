export interface BrandRespone {
  success: boolean;
  statusCode: number;
  message: string;
  data: BrandItme[];
}

export interface BrandItme {
  _id: string;
  name: string;
  logo: string;
  category: string | null;
  isActive: boolean;
  slug: string;
}