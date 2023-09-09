import { createSlice } from '@reduxjs/toolkit';

const initialBlogState = { title: '', topic: '', description: '' };

const blogSlice = createSlice({
  name: 'blog',
  initialState: initialBlogState,
  reducers: {
    addBlog(state, action) {
        const { title, topic, description } = action.payload;
        state.title = title;
        state.topic = topic;
        state.description = description;
      },
  },
});

export const blogActions = blogSlice.actions;

export default blogSlice.reducer;