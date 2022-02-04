import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filteredClothesSelector } from '../../filterSelector';
import Categories from '../../components/categories/Categories.jsx';
import ClosetSidebar from '../../components/closetSidebar/ClosetSidebar.jsx';
import {
  changeCategoryFilter,
  changeIsUserItemFilter,
  changeSeasonFilter,
  changeColorFilter,
  addCustomFilter,
  deleteCustomFilter,
} from '../../filterSlice';

function FilterContainer() {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filterSlice);
  const { category, isUserItem, colors, custom } = filter;

  const onKeyPress = event => {
    if (event.key === 'Enter') {
      const value = inputRef.current.value;
      dispatch(addCustomFilter(value));
      inputRef.current.value = '';
    }
  };

  const deleteCustomHandler = value => {
    dispatch(deleteCustomFilter(value));
  };

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
        customTags={custom}
        deleteCustomHandler={deleteCustomHandler}
        inputRef={inputRef}
        onKeyPress={onKeyPress}
      />
    </>
  )
}

export default FilterContainer;
