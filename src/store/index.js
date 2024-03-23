import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UserSlice from "./slice/UserSlice";
import CodeSlice from "./slice/CodeSlice";
import TabSlice from "./slice/SelectTab";
import kanbanSlice from "./slice/KanbanSlice";
import adminSlice from "./slice/AdminReq";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  users: UserSlice,
  code: CodeSlice,
  tabs: TabSlice,
  kanban: kanbanSlice,
  admin: adminSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
