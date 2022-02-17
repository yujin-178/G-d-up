import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  'isModalOpen' : false,
  'isResOpen': false,
  'resText':'',
  'confirm': false,
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
    changeisResOpen(state, action) {
      const isResOpen = action.payload;
      return {
        ...state,
        isResOpen
      };
    },
    changeResText(state, action) {
      const resText = action.payload;
      return {
        ...state,
        resText
      };
    },
    setConfirm(state, action) {
      state.confirm = action.payload;
    }
  },
});

export const {
  changeisModalOpen,
  changeisResOpen,
  changeResText,
  setConfirm,
} = modalSlice.actions;

export default modalSlice.reducer;
