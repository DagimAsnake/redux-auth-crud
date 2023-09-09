import { createSlice } from '@reduxjs/toolkit';

const initialBlogState = { blogs: [], selectedBlog: null };

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
    getOneBlog(state, action) {
      state.selectedBlog = action.payload;
    },
  },
});

export const { addBlog, getAllBlog, getOneBlog } = blogSlice.actions;

export default blogSlice.reducer;