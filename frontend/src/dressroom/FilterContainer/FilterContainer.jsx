import React from 'react';
import { useSelector } from 'react-redux';

function FilterContainer() {
  const filter = useSelector(state => state.filterSlice);

  return (
    <>
      FilterContainer
    </>
  )
}

export default FilterContainer;
