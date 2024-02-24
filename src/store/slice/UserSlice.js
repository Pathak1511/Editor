import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthorized: false,
  },
  reducers: {
    addUser(state, action) {
      state.isAuthorized = action.payload;
    },
    removeUser(state, action) {
      // state.splice(action.payload, 1);
      state.isAuthorized = false;
    },
    deleteUsers(state, action) {
      return [];
    },
  },
});

export default userSlice.reducer;
export const { addUser } = userSlice.actions;
export const { removeUser } = userSlice.actions;
export const { deleteUsers } = userSlice.actions;
