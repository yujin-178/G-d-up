import React from 'react';

import ClothesItem from './ClothesItem.jsx';

export default function ClothesItemList({ clothes }) {
  const numbers = [...Array(4).keys()];
  return (
    clothes.map(item =>
      <ClothesItem
        key={item['id']} 
        item={item}  
      >
      </ClothesItem>
    )
  );
}
