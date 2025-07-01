// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: localStorage.getItem("userName") || "",
  userEmail: localStorage.getItem("userEmail") || "",
  userRole: localStorage.getItem("userRole") || "",
  //  token: localStorage.getItem("token") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userRole = action.payload.userRole;
       state.token = action.payload.token;

      // Store in sessionStorage
      localStorage.setItem("userName", action.payload.userName);
      localStorage.setItem("userEmail", action.payload.userEmail);
      localStorage.setItem("userRole", action.payload.userRole);
      //  localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.userName = "";
      state.userEmail = "";
      state.userRole = "";

      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");
      localStorage.removeItem("token");

    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
