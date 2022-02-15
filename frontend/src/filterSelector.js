import { createSelector } from 'reselect';

const getClothes = state => state.clothesSlice.clothes;
const getFilter = state => state.filterSlice;

const isIncluded = (filterArray, target) => {
  if (!filterArray.length) {
    return true;
  }

  if (filterArray.includes(target)) {
    return true;
  }

  return false;
};

export const filteredClothesSelector = createSelector(
  getClothes,
  getFilter,
  (clothes, { category, selectedSeason, selectedColors, custom }) => clothes.filter(item => {
    if (category == '전체' || item.clothing.category == category) {
      if (!isIncluded(selectedSeason, item.clothing.season)) {
        return false;
      }

      if (!isIncluded(selectedColors, item.clothing.color)) {
        return false;
      }

      if (!custom.length) {
        return true;
      }

      const clothesCustomTag = item.hashtag;
      for (let i = 0; i < custom.length; i++) {
        if (!clothesCustomTag.includes(`#${custom[i]}`)) {
          return false;
        }
      }

      return true;
    }

    return false;
  }),
);
