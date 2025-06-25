import { Get } from "@/Api";
import { Url_Keys } from "@/Constant";
import { CategoryApiResponse, FetchApiParams, ProductSliceType } from "@/Types/Product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: ProductSliceType = {
  isAddCollectionModal: false,
  allCategory: null,
  singleEditingCategory: null,
  isCollectionSearchData: null
};

export const fetchCategoryApiData = createAsyncThunk<CategoryApiResponse, FetchApiParams>("admin/category", async ({ page, limit, search }) => {
  let url = `${Url_Keys.Category.Category}?page=${page}&limit=${limit}`;
  if (search) url += `&search=${search}`;
  const response = await Get<CategoryApiResponse>(url);
  return response?.data;
});

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    setAddCollectionModal: (state) => {
      state.isAddCollectionModal = !state.isAddCollectionModal;
    },
    setSingleEditingCategory(state, action) {
      state.singleEditingCategory = action.payload;
    },
    setCollectionSearchData: (state, action) => {
      state.isCollectionSearchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryApiData.fulfilled, (state, action) => {
      state.allCategory = action.payload;
    });
  },
});

export const { setAddCollectionModal, setSingleEditingCategory ,setCollectionSearchData} = ProductSlice.actions;
export default ProductSlice.reducer;
