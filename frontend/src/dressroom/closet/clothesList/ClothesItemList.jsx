import React from 'react';

import ClothesItem from './ClothesItem.jsx';

const numbers = [...Array(16).keys()];

export default function ClothesItemList() {
  return (
    numbers.map(number =>
      <ClothesItem key={number.toString()}>
      </ClothesItem>
    )
  );
}
