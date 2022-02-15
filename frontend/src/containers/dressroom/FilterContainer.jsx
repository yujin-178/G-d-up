import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Categories from '../../components/dressroom/Categories';
import ClosetSideBar from '../../components/dressroom/ClosetSideBar.jsx';
import {
  changeCategoryFilter,
  changeSeasonFilter,
  changeColorFilter,
  addCustomFilter,
  deleteCustomFilter,
} from '../../slices/filterSlice';
import { categories, season, colors } from '../../constants/filter';

function FilterContainer() {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filterSlice);
  const { category, selectedColors, custom } = filter;

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

  const deleteTagHandler = value => {
    dispatch(deleteCustomFilter(value));
  };

  const categoryHandler = categoryName => {
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
        categories={categories}
        selectedCategory={category}
        handleClick={categoryHandler}
      />
      <ClosetSideBar
        season={season}
        colors={colors}
        onChangeSeason={seasonHandler}
        selectedColors={selectedColors}
        onChangeColor={colorHandler}
        customTags={custom}
        deleteTagHandler={deleteTagHandler}
        inputRef={inputRef}
        onKeyPress={onKeyPress}
      />
    </>
  );
}

export default FilterContainer;
