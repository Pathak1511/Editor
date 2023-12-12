import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slice/UserSlice";

const store = configureStore({
  reducer: {
    users: UserSlice,
  },
});

export default store;
