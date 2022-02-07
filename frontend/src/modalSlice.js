import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  'IsmodalOpen' : false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    changeIsmodalOpen(state, action) {
      const IsmodalOpen = action.payload;
      return {
        ...state,
        IsmodalOpen
      };
    },
	},
});

export const {
  changeIsmodalOpen,
} = modalSlice.actions;

export default modalSlice.reducer;
