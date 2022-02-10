import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  'isModalOpen' : false,
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
  },
});

export const {
  changeisModalOpen
} = modalSlice.actions;

export default modalSlice.reducer;
