import { configureStore } from '@reduxjs/toolkit';

import blogReducer from './BlogSlice';
import authReducer from './AuthSlice'
import userReducer from './UserSlice'

const store = configureStore({
  reducer: { blog: blogReducer, auth: authReducer, user: userReducer },
});

export default store;