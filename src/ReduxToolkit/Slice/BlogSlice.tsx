import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddBlogModal: false,
};

const BlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setAddBlogModal: (state) => {
      state.isAddBlogModal = !state.isAddBlogModal;
    },
  },
});

export const { setAddBlogModal } = BlogSlice.actions;
export default BlogSlice.reducer;
