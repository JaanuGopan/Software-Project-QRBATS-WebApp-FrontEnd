import { createSlice } from '@reduxjs/toolkit';

export const locationListSlice = createSlice({
  name: 'locationList',
  initialState: [],
  reducers: {
    setLocationList: (state, action) => {
      return action.payload;
    },
    resetLocationList: () => {
      return [];
    },
  },
});

export const { setLocationList, resetLocationList } = locationListSlice.actions;
export default locationListSlice.reducer;
