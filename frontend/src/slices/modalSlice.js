import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  'isModalOpen' : false,
  'laundryOpen' : false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    changeisModalOpen(state, action) {
      const isModalOpen = action.payload;
      return {
        ...state,
        isModalOpen
      };
    },
    changelaundryOpen(state, action) {
      const laundryOpen = action.payload;
      return {
        ...state,
        laundryOpen
      };
    },
  },
});

export const {
  changeisModalOpen,
  changelaundryOpen,
} = modalSlice.actions;

export default modalSlice.reducer;
