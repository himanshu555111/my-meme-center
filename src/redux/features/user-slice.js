import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 user_info: {}
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    set_user_info: (state, action) => {
      const currentState = action.payload;
      state.user_info = currentState;
    },   
  },
});

export const {
    set_user_info
} = userSlice.actions;

export default userSlice.reducer;
