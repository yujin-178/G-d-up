import { createSelector } from 'reselect';

const getClothes = state => state.clothesSlice.clothes; // 현재는 mock data
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

    if (category == '전체' || item.category == category) {

      // todo: 차후 userSlice에서 유저 정보를 가져와서 로직 완성 예정
      // if (isUserItem) {
      // 	if (item.userName === '현재 로그인한 사용자 이름') {
      // 		return true;
      // 	}

      // 	return false;
      // }

      if (!isIncluded(selectedSeason, item.season)) {
        return false;
      }

      if (!isIncluded(selectedColors, item.color)) {
        return false;
      }

      if (!custom.length) {
        return true;
      }

      const clothesCustomTag = item.custom;
      for (let i = 0; i < custom.length; i++) {
        if (!clothesCustomTag.includes(custom[i])) {
          return false;
        }
      }

      return true;
    }

    return false;
  }),
);
