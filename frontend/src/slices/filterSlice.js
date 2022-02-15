import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  'category': '전체',
  'selectedSeason': [],
  'selectedColors': [],
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
      const { selectedSeason } = state;

      if (isChecked) {
        return {
          ...state,
          selectedSeason: [...selectedSeason, season]
        };
      }

      const removed = selectedSeason.filter(item => item !== season);
      return {
        ...state,
        selectedSeason: removed
      };
    },
    changeColorFilter(state, action) {
      const { selectedColors } = state;
      const color = action.payload;

      if (selectedColors.includes(color)) {
        const removed = selectedColors.filter(item => item !== color);
        return {
          ...state,
          selectedColors: [...removed]
        };
      }

      return {
        ...state,
        selectedColors: [...selectedColors, color]
      };
    },
    addCustomFilter(state, action) {
      const value = action.payload;
      if (state.custom.indexOf(value) === -1) {
        return {
          ...state,
          custom: [...state.custom, value]
        };
      }

      return state;
    },
    deleteCustomFilter(state, action) {
      const value = action.payload;
      const removed = state.custom.filter(item => item !== value);
      return {
        ...state,
        custom: removed
      };
    },
    resetFilter() {
      return initialState;
    },
  },
});

export const {
  changeCategoryFilter,
  changeSeasonFilter,
  changeColorFilter,
  addCustomFilter,
  deleteCustomFilter,
  resetFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
