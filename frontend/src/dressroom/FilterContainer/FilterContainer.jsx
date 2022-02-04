import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filteredClothesSelector } from '../../filterSelector';
import Categories from '../../components/Categories/Categories.jsx';
import ClosetSidebar from '../../components/ClosetSidebar/ClosetSidebar.jsx';
import {
  changeCategoryFilter,
  changeIsUserItemFilter,
  changeSeasonFilter,
  changeColorFilter,
} from '../../filterSlice';

function FilterContainer() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filterSlice);
  const { category, isUserItem, colors } = filter;

  const categoryHandler = categoryName => {
    if (category !== categoryName) {
      dispatch(changeCategoryFilter(categoryName));
    }
  };

  const userToggleHandler = () => {
    dispatch(changeIsUserItemFilter());
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
        handleClick={categoryHandler}
      />
      <ClosetSidebar
        selectedColors={colors}
        isUserItem={isUserItem}
        toggleIsUserItem={userToggleHandler}
        onChangeSeason={seasonHandler}
        onChangeColor={colorHandler}
      />
    </>
  )
}

export default FilterContainer;
