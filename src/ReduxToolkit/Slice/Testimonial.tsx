import { Get } from "@/Api";
import { Url_Keys } from "@/Constant";
import { FetchApiParams } from "@/Types/Product";
import { TestimonialApiResponse, TestimonialSliceType } from "@/Types/Testimonial";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: TestimonialSliceType = {
  isAddTestimonialModal: false,
  allTestimonial: null,
  isLoadingTestimonial: true,
  singleEditingTestimonial:null
};

export const fetchTestimonialApiData = createAsyncThunk<TestimonialApiResponse, FetchApiParams>("admin/testimonial", async ({ page, limit, search}) => {
  let url = Url_Keys.Testimonial.Testimonial;
  if (page) url += `?page=${page}&limit=${limit}`;
  if (search) url += `&search=${search}`;
  const response = await Get<TestimonialApiResponse>(url);
  return response?.data;
});

const TestimonialSlice = createSlice({
  name: "Testimonial",
  initialState,
  reducers: {
    setAddTestimonialModal: (state) => {
      state.isAddTestimonialModal = !state.isAddTestimonialModal;
    },
    setSingleEditingTestimonial(state, action) {
      state.singleEditingTestimonial = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTestimonialApiData.fulfilled, (state, action) => {
      state.allTestimonial = action.payload;
      state.isLoadingTestimonial = false;
    });
  },
});

export const { setAddTestimonialModal, setSingleEditingTestimonial} = TestimonialSlice.actions;
export default TestimonialSlice.reducer;
