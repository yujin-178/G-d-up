import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Categories from '../../components/Categories/Categories.jsx';
import { changeCategoryFilter } from '../../filterSlice';

function FilterContainer() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filterSlice);
  const { category } = filter;

  const handleClick = categoryName => {
    if (category !== categoryName) {
      dispatch(changeCategoryFilter(categoryName));
    }
  };

  return (
    <>
      <Categories
        selectedCategory={category}
        handleClick={handleClick}
      />
    </>
  )
}

export default FilterContainer;
