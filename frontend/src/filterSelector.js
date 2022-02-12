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
  (clothes, { category, selectedColors, custom }) => clothes.filter(item => {
    if (category == '전체' || item.clothing.category == category) {

      // todo: 차후 userSlice에서 유저 정보를 가져와서 로직 완성 예정
      // if (isUserItem) {
      // 	if (item.userName === '현재 로그인한 사용자 이름') {
      // 		return true;
      // 	}

      // 	return false;
      // }

      // 시즌 제외 가능성
      // if (!isIncluded(selectedSeason, item.season)) {
      //   return false;
      // }

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
