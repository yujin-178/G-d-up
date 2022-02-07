import React from 'react';

import ClothesItem from './ClothesItem.jsx';

export default function ClothesItemList({ clothes }) {
  const numbers = [];
  for (let i = 0; i < 16; i++) {
    numbers.push(undefined);
  }

  return (
    numbers.map((number, idx) =>
      <ClothesItem
        key={ idx }
        item={ clothes[idx] }
      />
    )
  );
}
