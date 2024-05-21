import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import mainNavigationReducer from "../features/mainNavigationSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    mainNavigation: mainNavigationReducer,
  },
});
