export interface AddProductReviewModalType {
  isEdit: boolean;
  setEdit: (isEdit: boolean) => void;
  getAllProductReview: () => void;
}

export interface ProductReviewType {
  _id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductReviewState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface ProductReviewApiResponse {
  review_data: ProductReviewType[];
  totalData: number;
  state: ProductReviewState;
}

export interface ProductReviewSliceType {
  isAddProductReviewModal: boolean;
  allProductReview: ProductReviewApiResponse;
  isLoadingProductReview: boolean;
  singleEditingProductReview: ProductReviewType;
}

export interface ProductReviewFormData {
  productId: string;
  rating: number;
  comment: string;
}