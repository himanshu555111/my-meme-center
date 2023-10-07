import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import drawerReducer from "./features/drawer-slice";
import folderReducer from "./features/folder-slice";
import userReducer from "./features/user-slice";


const reducers = combineReducers({
  drawer: drawerReducer,
  folder: folderReducer,
  user: userReducer
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  //   devTools: import.meta.env.NODE_ENV !== "production",
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});


