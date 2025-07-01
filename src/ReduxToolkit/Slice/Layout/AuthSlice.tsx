import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || {},
  },
  reducers: {
    login(state, action) {
      Cookies.set("token", action.payload.token, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logout(state) {
      localStorage.removeItem("user");
      Cookies.remove("token");
      state.user = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
