import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currOwner: null,
    myId: null,
  },
  reducers: {
    addUser(state, action) {
      state.currOwner = action.payload.currOwner;
      state.myId = action.payload.myId;
    },
    removeUser(state, action) {
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
