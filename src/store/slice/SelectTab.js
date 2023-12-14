import { createSlice } from "@reduxjs/toolkit";

const TabSlice = createSlice({
  name: "tabs",
  initialState: [{ id: 0, file_name: "main.cpp" }],
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
      return [...state, { id, file_name }];
    },
  },
});

export default TabSlice.reducer;
export const { selectTab } = TabSlice.actions;
export const { removeTabs } = TabSlice.actions;
export const { addNewTab } = TabSlice.actions;
