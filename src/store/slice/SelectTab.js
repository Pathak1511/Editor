import { createSlice } from "@reduxjs/toolkit";

const TabSlice = createSlice({
  name: "tabs",
  initialState: [],
  reducers: {
    selectTab(state, action) {
      return action.payload;
    },
    removeTabs(state, action) {
      const { id } = action.payload;
      return state.filter((tab) => tab.id !== id);
    },
    addNewTab(state, action) {
      const { id, file_name } = action.payload;
      const isTabExist = state.findIndex((obj) => obj.id === id);
      if (isTabExist === -1) {
        return [...state, { id, file_name }];
      }
    },
  },
});

export default TabSlice.reducer;
export const { selectTab } = TabSlice.actions;
export const { removeTabs } = TabSlice.actions;
export const { addNewTab } = TabSlice.actions;
