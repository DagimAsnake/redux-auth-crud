import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    registerUser: (state, action) => {
      const { username, email } = action.payload;
      const newUser = {
        username,
        email,
      };
      state.push(newUser);
    },
  },
});

export const { registerUser } = userSlice.actions;
export default userSlice.reducer;