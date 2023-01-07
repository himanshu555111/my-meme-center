import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle_drawer: false,  
};

const drawerSlice = createSlice({
  name: "drawerSlice",
  initialState,
  reducers: {
    set_toggle_drawer: (state, action) => {
      const currentState = action.payload;
      state.toggle_drawer = currentState;
    },   
  },
});

export const {
    set_toggle_drawer
} = drawerSlice.actions;

export default drawerSlice.reducer;
