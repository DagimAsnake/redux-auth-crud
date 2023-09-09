import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    registerUser: (state, action) => {
      const { username, } = action.payload;
      const newUser = {
        username,
      };
      state.push(newUser);
    },
    loginUser: (state, action) => {
      const { username } = action.payload;
      const loggedInUser = {
        username,
      };
      state.push(loggedInUser);
    },
  },
});

export const { registerUser, loginUser } = userSlice.actions;
export default userSlice.reducer;