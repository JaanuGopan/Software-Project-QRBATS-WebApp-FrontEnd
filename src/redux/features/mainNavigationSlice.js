import { createSlice } from "@reduxjs/toolkit";

export const mainNavigationSlice = createSlice({
  name: "mainNavigation",
  initialState: {
    sideBarIndex:
      localStorage.getItem("sideBarIndex") != null
        ? parseInt(localStorage.getItem("sideBarIndex"))
        : 0,
  },
  reducers: {
    setSideBarIndex: (state, action) => {
      state.sideBarIndex = action.payload;
      localStorage.setItem("sideBarIndex", action.payload);
    },
    resetSideBarIndex: (state) => {
      state.mainNavigation = 0;
      localStorage.removeItem("sideBarIndex");
    },
  },
});

export const { setSideBarIndex, resetSideBarIndex } =
  mainNavigationSlice.actions;
export default mainNavigationSlice.reducer;
