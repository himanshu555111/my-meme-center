import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 folder_param_id: '',  
};

const folderSlice = createSlice({
  name: "folderSlice",
  initialState,
  reducers: {
    set_folder_param_id: (state, action) => {
      const currentState = action.payload;
      state.folder_param_id = currentState;
    },   
  },
});

export const {
    set_folder_param_id
} = folderSlice.actions;

export default folderSlice.reducer;
