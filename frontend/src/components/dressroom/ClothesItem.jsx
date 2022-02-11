import React from 'react';

import { css } from '@emotion/react';

export default function ClothesItem(props) {
  const {
    item,
    // onMouseOverHandler,
    OnMouseLeaveHandler
  } = props;

  return (
    <div css={ClothesItemBox}>
      {item && (
        <img
          width="100%"
          src={item.clothing.imageModel.imageUrl}
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
