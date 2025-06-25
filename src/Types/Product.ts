export interface CategoryFormData  {
  name: string;
  slug: string;
  description: string;
  image?: string[]; 
  isFeatured: boolean;
};

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
  page: number;
  limit: number;
  search?: string;
}

export interface ProductSliceType {
  isAddCollectionModal: boolean;
  allCategory: CategoryApiResponse;
  singleEditingCategory: CategoryType;
  isCollectionSearchData:string
}