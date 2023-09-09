import { configureStore } from '@reduxjs/toolkit';

import blogReducer from './BlogSlice';


const store = configureStore({
  reducer: { blog: blogReducer },
});

export default store;