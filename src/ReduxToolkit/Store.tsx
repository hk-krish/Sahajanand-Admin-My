import { configureStore } from "@reduxjs/toolkit";
import LayoutSlice from "./Slice/Layout/LayoutSlice";
import ThemeCustomizerSlice from "./Slice/Layout/ThemeCustomizerSlice";
import ProductSlice from "./Slice/ProductSlice";
import FaqSlice from "./Slice/FaqSlice";
import BannersSlice from "./Slice/BannersSlice";
import BlogSlice from "./Slice/BlogSlice";
import AboutSlice from "./Slice/AboutSlice";

export const store = configureStore({
  reducer: {
    layout: LayoutSlice,
    themeCustomizer: ThemeCustomizerSlice,
    product: ProductSlice, 
    faq: FaqSlice, 
    banners: BannersSlice, 
    blog: BlogSlice, 
    about: AboutSlice,  
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
