// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: sessionStorage.getItem('userName') || '',
  userEmail: sessionStorage.getItem('userEmail') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;

      // Store in sessionStorage
      sessionStorage.setItem('userName', action.payload.userName);
      sessionStorage.setItem('userEmail', action.payload.userEmail);
    },
    logout: (state) => {
      state.userName = '';
      state.userEmail = '';
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('userEmail');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
