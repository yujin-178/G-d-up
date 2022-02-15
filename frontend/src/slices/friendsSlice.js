import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setIsOpen(state, action) {
      return {
        ...state,
        isOpen: action.payload,
      };
    },
  },
});

export const { setIsOpen } = friendsSlice.actions;

export default friendsSlice.reducer;
