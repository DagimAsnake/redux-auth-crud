import { createSlice } from '@reduxjs/toolkit';

const initialBlogState = { blogs: [] };

const blogSlice = createSlice({
  name: 'blog',
  initialState: initialBlogState,
  reducers: {
    addBlog(state, action) {
      const { title, topic, description } = action.payload;
      const newBlog = { title, topic, description };
      state.blogs.push(newBlog);
    },
    getAllBlog(state, action) {
      state.blogs = action.payload;
    },
  },
});

export const { addBlog, getAllBlog } = blogSlice.actions;

export default blogSlice.reducer;