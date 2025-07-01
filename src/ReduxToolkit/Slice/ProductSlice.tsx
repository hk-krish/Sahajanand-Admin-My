import { Get } from "@/Api";
import { Url_Keys } from "@/Constant";
import { CategoryApiResponse, CollectionApiResponse, FetchApiParams, ProductApiResponse, ProductSliceType } from "@/Types/Product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: ProductSliceType = {
  allCategory: null,
  singleEditingCategory: null,
  isCategorySearchData: null,
  isLoadingCategory: true,
  allProduct: null,
  isProductSearchData: null,
  singleEditingProduct: null,
  isLoadingProduct: true,
  allCollection: null,
  isLoadingCollection: true,
  isCollectionSearchData: null,
  singleEditingCollection: null,
};

export const fetchCategoryApiData = createAsyncThunk<CategoryApiResponse, FetchApiParams>("admin/category", async ({ page, limit, search }) => {
  let url = Url_Keys.Category.Category;
  if (page) url += `?page=${page}&limit=${limit}`;
  if (search) url += `&search=${search}`;
  const response = await Get<CategoryApiResponse>(url);
  return response?.data;
});

export const fetchProductApiData = createAsyncThunk<ProductApiResponse, FetchApiParams>("admin/product", async ({ page, limit, search }) => {
  let url = Url_Keys.Product.Product;
  if (page) url += `?page=${page}&limit=${limit}`;
  if (search) url += `&search=${search}`;
  const response = await Get<ProductApiResponse>(url);
  return response?.data;
});

export const fetchCollectionApiData = createAsyncThunk<CollectionApiResponse, FetchApiParams>("admin/collection", async ({ page, limit, search, typeFilter }) => {
  let url = Url_Keys.Collection.Collection;
  if (page) url += `?page=${page}&limit=${limit}`;
  if (search) url += `&search=${search}`;
  if (typeFilter) url += `&typeFilter=${typeFilter}`;
  const response = await Get<CollectionApiResponse>(url);
  return response?.data;
});

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    setSingleEditingCategory(state, action) {
      state.singleEditingCategory = action.payload;
    },
    setCategorySearchData: (state, action) => {
      state.isCategorySearchData = action.payload;
    },
    setProductSearchData: (state, action) => {
      state.isProductSearchData = action.payload;
    },
    setSingleEditingProduct(state, action) {
      state.singleEditingProduct = action.payload;
    },
    setCollectionSearchData: (state, action) => {
      state.isCollectionSearchData = action.payload;
    },
    setSingleEditingCollection(state, action) {
      state.singleEditingCollection = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryApiData.fulfilled, (state, action) => {
      state.allCategory = action.payload;
      state.isLoadingCategory = false;
    });
    builder.addCase(fetchProductApiData.fulfilled, (state, action) => {
      state.allProduct = action.payload;
      state.isLoadingProduct = false;
    });
    builder.addCase(fetchCollectionApiData.fulfilled, (state, action) => {
      state.allCollection = action.payload;
      state.isLoadingCollection = false;
    });
  },
});

export const {setSingleEditingCategory, setCategorySearchData, setProductSearchData, setSingleEditingProduct, setCollectionSearchData, setSingleEditingCollection } = ProductSlice.actions;
export default ProductSlice.reducer;
