import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddCollectionModal: false,
};

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    setAddCollectionModal: (state) => {
      state.isAddCollectionModal = !state.isAddCollectionModal;
    },
  },
});

export const { setAddCollectionModal } = ProductSlice.actions;
export default ProductSlice.reducer;
