import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slice/UserSlice";
import CodeSlice from "./slice/CodeSlice";
import TabSlice from "./slice/SelectTab";

const store = configureStore({
  reducer: {
    users: UserSlice,
    code: CodeSlice,
    tabs: TabSlice,
  },
});

export default store;
