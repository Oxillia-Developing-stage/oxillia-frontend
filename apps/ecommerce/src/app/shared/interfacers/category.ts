export interface CategoryResponse
{
    success: boolean;
    statusCode: number;
    message: string;
    data: CategoryItem[];
}
export interface CategoryItem {
    _id: string;
    name: string;
    image: string;
    isActive: boolean;
    slug: string;
    subcategories: SubCategoryItem[];
}
export interface SubCategoryItem {
    _id: string;
    name: string;
    image: string;
    category: string; // parent category ID
    isActive: boolean;
    slug: string;
  }