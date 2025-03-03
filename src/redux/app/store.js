import { configureStore } from '@reduxjs/toolkit';
import locationListSlice from '../features/locationListSlice';
export default configureStore({
  reducer: {
    locationList: locationListSlice,
  },
});
