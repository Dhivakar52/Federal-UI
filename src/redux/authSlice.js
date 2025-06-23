// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: sessionStorage.getItem("userName") || "",
  userEmail: sessionStorage.getItem("userEmail") || "",
  userRole: sessionStorage.getItem("userRole") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userRole = action.payload.userRole;

      // Store in sessionStorage
      sessionStorage.setItem("userName", action.payload.userName);
      sessionStorage.setItem("userEmail", action.payload.userEmail);
      sessionStorage.setItem("userRole", action.payload.userRole);
    },
    logout: (state) => {
      state.userName = "";
      state.userEmail = "";
      state.userRole = "";

      sessionStorage.removeItem("userName");
      sessionStorage.removeItem("userEmail");
      sessionStorage.removeItem("userRole");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
