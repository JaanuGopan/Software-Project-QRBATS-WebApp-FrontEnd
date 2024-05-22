import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import mainNavigationReducer from "../features/mainNavigationSlice";
import locationListSlice from "../features/locationListSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    mainNavigation: mainNavigationReducer,
    locationList: locationListSlice,
  },
});
