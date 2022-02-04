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
    changeCategoryFilter(state, action) {
      const category = action.payload;
      return {
        ...state,
        category
      };
    },
  },
});

export const {
  changeCategoryFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
