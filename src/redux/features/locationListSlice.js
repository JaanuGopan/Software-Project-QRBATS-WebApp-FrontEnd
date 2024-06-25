import { createSlice } from "@reduxjs/toolkit";

export const locationListSlice = createSlice({
  name: "locationList",
  initialState: ["NCC", "LT1", "LT2", "Auditorium", "DEIE", "DMME", "DCEE"],
  reducers: {
    setLocationList: (state, action) => {
      state = [];
      state.push(...state, action.payload);
    },
    resetLocationList: (state) => {
      state = [];
    },
  },
});

export const { setLocationList, resetLocationList } = locationListSlice.actions;
export default locationListSlice.reducer;
