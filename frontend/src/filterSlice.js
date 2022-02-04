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
    changeIsUserItemFilter(state) {
      return {
        ...state,
        isUserItem: !state.isUserItem
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

      const removed = state.season.filter(item => item !== season);
      return {
        ...state,
        season: removed
      };
    },
    changeColorFilter(state, action) {
      const selectedColors = state.colors;
      const color = action.payload;

      if (selectedColors.includes(color)) {
        const removed = selectedColors.filter(item => item !== color);
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
    }
  },
});

export const {
  changeCategoryFilter,
  changeIsUserItemFilter,
  changeSeasonFilter,
  changeColorFilter,
  addCustomFilter,
  deleteCustomFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
