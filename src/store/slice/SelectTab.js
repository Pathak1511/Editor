import { createSlice } from "@reduxjs/toolkit";

const TabSlice = createSlice({
  name: "tabs",
  initialState: "0",
  reducers: {
    selectTab(state, action) {
      return action.payload;
    },
  },
});

export default TabSlice.reducer;
export const { selectTab } = TabSlice.actions;
