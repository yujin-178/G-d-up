import React from 'react';

import { css } from '@emotion/react';

export default function ClothesItem(props) {
  const {
    item,
    onMouseOverHandler,
    OnMouseLeaveHandler
  } = props;

  console.log(item);
  return (
    <div css={ClothesItemBox}>
      {item && (
        <img
          src={item.clothing.imageModel.imagePath}
          // onMouseOver={() => onMouseOverHandler(item)}
          onMouseLeave={OnMouseLeaveHandler}
        />
      )}
    </div>
  );
}

const ClothesItemBox = css`
  position: relative;
  background-color: #FFFFFF;
  width: 7rem;
  height: 7rem;
  margin: 0.5rem;
  align-self: center;
  justify-self: center;
`;
