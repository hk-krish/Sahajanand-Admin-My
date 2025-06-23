import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddFaqModal: false,
};

const FaqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    setAddFaqModal: (state) => {
      state.isAddFaqModal = !state.isAddFaqModal;
    },
  },
});

export const { setAddFaqModal } = FaqSlice.actions;
export default FaqSlice.reducer;
