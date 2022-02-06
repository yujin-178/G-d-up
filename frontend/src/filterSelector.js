import { createSelector } from 'reselect';

const getClothes = state => state.clothesSlice; // 현재는 mock data
const getFilter = state => state.filterSlice;

export const filteredClothesSelector = createSelector(
    getClothes,
    getFilter,
    (clothes, { category, season, colors, custom }) => clothes.filter(item => {
        if (category == 'all') {
            return true;
        }
        if (item.category == category) {
            return true;
        }
        return false;
        // todo: 필터 기능 추가
    }),
);
