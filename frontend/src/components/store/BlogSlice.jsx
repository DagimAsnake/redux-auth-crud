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
    deleteBlog(state, action) {
        const blogId = action.payload;
        state.blogs = state.blogs.filter((blog) => blog.id !== blogId);
        if (state.selectedBlog && state.selectedBlog.id === blogId) {
          state.selectedBlog = null;
        }
      },
  },
});

export const { addBlog, getAllBlog, getOneBlog, deleteBlog } = blogSlice.actions;

export default blogSlice.reducer;