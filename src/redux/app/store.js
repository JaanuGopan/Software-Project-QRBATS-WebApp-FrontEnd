import { configureStore } from '@reduxjs/toolkit';
import mainNavigationReducer from '../features/mainNavigationSlice';
import locationListSlice from '../features/locationListSlice';
export default configureStore({
  reducer: {
    mainNavigation: mainNavigationReducer,
    locationList: locationListSlice,
  },
});
