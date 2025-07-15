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
  uniqueCategoryId: string;
  image: File[];
  tags: SelectOption[];
  colorIds: SelectOption[];
  sizeIds: SelectOption[];
  materialIds: SelectOption[];
  fabricIds: SelectOption[];
  occasionIds: SelectOption[];
  isNewArrival: boolean;
  isBestSelling: boolean;
  isFeatured: boolean;
  showOnHomepage: boolean;
}

export interface SubAttributes {
  _id: string;
  name: string;
  colorCode?: string;
}

export interface Attributes {
  colorIds: SubAttributes[];
  sizeIds: SubAttributes[];
  materialIds: SubAttributes[];
  fabricIds: SubAttributes[];
  occasionIds: SubAttributes[];
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
  uniqueCategoryId: string;
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
  priority: number;
  products: SelectOption[];
}

export interface UniqueCategoryType {
  _id: string;
  name: string;
  priority: number;
  image: string;
  isDeleted: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UniqueCategoryState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface UniqueCategoryApiResponse {
  unique_category_data: UniqueCategoryType[];
  totalData: number;
  state: UniqueCategoryState;
}

export interface ProductSliceType {
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
  allUniqueCategory: UniqueCategoryApiResponse;
  singleEditingUniqueCategory: UniqueCategoryType;
  isUniqueCategorySearchData: string;
  isLoadingUniqueCategory: boolean;
  isAddUniqueCategoryModal: boolean;
}

export interface AddUniqueCategoryModalType {
  isEdit: boolean;
  setEdit: (isEdit: boolean) => void;
  getAllUniqueCategory: () => void;
}

export interface UniqueCategoryFormData {
  name: string;
  priority: number;
  image?: string[];
}
