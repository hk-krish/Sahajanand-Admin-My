import { configureStore } from "@reduxjs/toolkit";
import LayoutSlice from "./Slice/Layout/LayoutSlice";
import ThemeCustomizerSlice from "./Slice/Layout/ThemeCustomizerSlice";
import ProductSlice from "./Slice/ProductSlice";
import FaqSlice from "./Slice/FaqSlice";
import BannersSlice from "./Slice/BannersSlice";
import BlogSlice from "./Slice/BlogSlice";
import AboutSlice from "./Slice/AboutSlice";
import AuthSlice from "./Slice/Layout/AuthSlice";
import UserSlice from "./Slice/UserSlice";
import TestimonialSlice from "./Slice/Testimonial";
import ProductReviewSlice from "./Slice/ProductReview";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    layout: LayoutSlice,
    themeCustomizer: ThemeCustomizerSlice,
    product: ProductSlice,
    faq: FaqSlice,
    banners: BannersSlice,
    blog: BlogSlice,
    about: AboutSlice,
    users: UserSlice,
    testimonial: TestimonialSlice,
    productReview: ProductReviewSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
