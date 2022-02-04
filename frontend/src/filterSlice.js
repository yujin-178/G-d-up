import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  'category': 'all',
  'isUserItem': false,
  'season': [],
  'colors': [],
  'custom': [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    //to-do
  },
});

export default filterSlice.reducer;

