import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      token: localStorage.getItem('session') || '',
      isLoggedIn: !!localStorage.getItem('session'),
    },
    reducers: {
      login(state, action) {
        const token = action.payload;
        state.token = token;
        state.isLoggedIn = true;
        localStorage.setItem('session', token);
      },
      logout(state) {
        state.token = '';
        state.isLoggedIn = false;
        localStorage.removeItem('session');
      },
    },
  });
  

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;