import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Categories from '../../components/Categories/Categories.jsx';
import ClosetSidebar from '../../components/ClosetSidebar/ClosetSidebar.jsx';
import {
  changeCategoryFilter,
  changeSeasonFilter,
  changeColorFilter,
} from '../../filterSlice';

function FilterContainer() {
  const dispatch = useDispatch();
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
