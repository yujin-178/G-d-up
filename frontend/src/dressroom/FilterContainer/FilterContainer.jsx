import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filteredClothesSelector } from '../../filterSelector';
import Categories from '../../components/categories/Categories.jsx';
import ClosetSidebar from '../../components/closetSidebar/ClosetSidebar.jsx';
import {
  changeCategoryFilter,
  changeSeasonFilter,
  changeColorFilter,
} from '../../filterSlice';

function FilterContainer() {
  const dispatch = useDispatch();
  const filteredClothes = useSelector(filteredClothesSelector);
  const filter = useSelector(state => state.filterSlice);
  const { category, colors } = filter;

  const handleClick = categoryName => {
    if (category !== categoryName) {
      dispatch(changeCategoryFilter(categoryName));
    }
  };

  const seasonHandler = (isChecked, season) => {
    dispatch(changeSeasonFilter({
      isChecked,
      season
    }));
  };

  const colorHandler = color => {
    dispatch(changeColorFilter(color));
  };

  return (
    <>
      <Categories
        selectedCategory={category}
        handleClick={handleClick}
      />
      <ClosetSidebar
        selectedColors={colors}
        onChangeSeason={seasonHandler}
        onChangeColor={colorHandler}
      />
    </>
  )
}

export default FilterContainer;
