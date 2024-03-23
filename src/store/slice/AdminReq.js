import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: [],
  reducers: {
    addAdminUser(state, action) {
      return action.payload;
    },
    deleteAdminUser(state, action) {
      return state.filter((user) => user.id !== action.payload.id);
    },
    clearAdminUser(state, action) {
      return [];
    },
  },
});

export default adminSlice.reducer;
export const { addAdminUser } = adminSlice.actions;
export const { deleteAdminUser } = adminSlice.actions;
export const { clearAdminUser } = adminSlice.actions;
