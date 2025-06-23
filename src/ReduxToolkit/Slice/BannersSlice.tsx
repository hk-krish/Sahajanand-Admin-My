import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddBannerModal: false,
};

const BannersSlice = createSlice({
  name: "Banners",
  initialState,
  reducers: {
    setAddBannerModal: (state) => {
      state.isAddBannerModal = !state.isAddBannerModal;
    },
  },
});

export const { setAddBannerModal } = BannersSlice.actions;
export default BannersSlice.reducer;
