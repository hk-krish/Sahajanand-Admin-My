import { Get } from "@/Api";
import { Url_Keys } from "@/Constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CategoryType {
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

interface ProductSliceType {
  isAddCollectionModal: boolean;
  allCategory: CategoryApiResponse;
}

const initialState: ProductSliceType = {
  isAddCollectionModal: false,
  allCategory: null,
};

export const fetchCategoryApiData = createAsyncThunk<CategoryApiResponse, void>("admin/category", async () => {
  const response = await Get<CategoryApiResponse>(Url_Keys.Category.Category);
  return response?.data;
});

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    setAddCollectionModal: (state) => {
      state.isAddCollectionModal = !state.isAddCollectionModal;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryApiData.fulfilled, (state, action) => {
      state.allCategory = action.payload;
    });
  },
});

export const { setAddCollectionModal } = ProductSlice.actions;
export default ProductSlice.reducer;
