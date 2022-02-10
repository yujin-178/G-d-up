import React from 'react';

import { css } from '@emotion/react';

export default function ClothesItem(props) {
  const {
    item,
    onMouseOverHandler,
    OnMouseLeaveHandler
  } = props;

  return (
    <div css={ClothesItemBox}>
      {item && (
        <p
          onMouseOver={() => onMouseOverHandler(item)}
          onMouseLeave={OnMouseLeaveHandler}
        >{item.image}</p>
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
