import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Categories from '../../components/categories/Categories.jsx';
import ClosetSideBar from '../../components/closetSidebar/ClosetSideBar.jsx';
import {
  changeCategoryFilter,
  changeIsUserItemFilter,
  changeSeasonFilter,
  changeColorFilter,
  addCustomFilter,
  deleteCustomFilter,
} from '../../filterSlice';
import { categories, season, colors } from '../../constants/filter';

function FilterContainer() {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filterSlice);
  const { category, isUserItem, selectedColors, custom } = filter;

  const onKeyPress = event => {
    if (event.key === 'Enter') {
      const value = inputRef.current.value;
      if (value) {
        dispatch(addCustomFilter(value));
        inputRef.current.value = '';
      } else {
        alert('내용을 입력해주세요');
      }
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
        categories={categories}
        selectedCategory={category}
        handleClick={categoryHandler}
      />
      <ClosetSideBar
        season={season}
        colors={colors}
        selectedColors={selectedColors}
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
  );
}

export default FilterContainer;
