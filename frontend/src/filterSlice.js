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
    changeSeasonFilter(state, action) {
      const { isChecked, season } = action.payload;
      if (isChecked) {
        return {
          ...state,
          season: [...state.season, season]
        };
      }

      const excluded = state.season.filter(item => item != season);
      return {
        ...state,
        season: excluded
      };
    },
    changeColorFilter(state, action) {
      const selectedColors = state.colors;
      const color = action.payload;

      if (selectedColors.includes(color)) {
        const removed = selectedColors.filter(item => item != color);
        return {
          ...state,
          colors: [...removed]
        };
      }

      return {
        ...state,
        colors: [...selectedColors, color]
      };
    },
  },
});

export const {
  changeCategoryFilter,
  changeSeasonFilter,
  changeColorFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
