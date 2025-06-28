export interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  image?: string[];
  isFeatured: boolean;
}

export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  level: number;
  isFeatured: boolean;
  isDeleted: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryApiResponse {
  category_data: CategoryType[];
  totalData: number;
  state: {
    page: number;
    limit: number;
    page_limit: number;
  };
}

export interface FetchApiParams {
  page?: number;
  limit?: number;
  search?: string;
  typeFilter?: string;
  category?: string;
}

// Product
export interface SelectOption {
  label: string;
  id?: string;
  customOption?: boolean;
  value?: string;
}

export interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice: number;
  sku: string;
  stock: number;
  categoryId: string;
  subCategoryId: string;
  image: File[];
  tags: SelectOption[];
  color: SelectOption[];
  size: SelectOption[];
  material: SelectOption[];
  fabric: SelectOption[];
  occasion: SelectOption[];
  isNewArrival: boolean;
  isBestSelling: boolean;
  isFeatured: boolean;
  showOnHomepage: boolean;
}

export interface Attributes {
  color: string[];
  size: string[];
  material: string[];
  fabric: string[];
  occasion: string[];
}

export interface SEO {
  keywords: string[];
}

export interface ProductType {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice: number;
  sku: string;
  images: string[];
  categoryId: string;
  subCategoryId: string;
  tags: string[];
  attributes: Attributes;
  stock: number;
  isNewArrival: boolean;
  isBestSelling: boolean;
  isFeatured: boolean;
  showOnHomepage: boolean;
  seo: SEO;
  rating: number;
  isDeleted: boolean;
  isBlocked: boolean;
  reviews: any[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductApiResponse {
  product_data: ProductType[];
  totalData: number;
  state: {
    page: number;
    limit: number;
    page_limit: number;
  };
}

//Collection
export interface CollectionType {
  _id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  isVisible: boolean;
  products: string[];
  priority: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CollectionApiResponse {
  collection_data: CollectionType[];
  totalData: number;
  state: {
    page: number;
    limit: number;
    page_limit: number;
  };
}

export interface CollectionFormData {
  name: string;
  type: string;
  description: string;
  image?: string[];
  isVisible: boolean;
  priority:number;
  products:SelectOption[]
}


export interface ProductSliceType {
  isAddCollectionModal: boolean;
  allCategory: CategoryApiResponse;
  singleEditingCategory: CategoryType;
  isCategorySearchData: string;
  isLoadingCategory: boolean;
  allProduct: ProductApiResponse;
  isProductSearchData: string;
  singleEditingProduct: ProductType;
  isLoadingProduct: boolean;
  allCollection: CollectionApiResponse;
  isLoadingCollection: boolean;
  isCollectionSearchData: string;
  singleEditingCollection: CollectionType;
}
