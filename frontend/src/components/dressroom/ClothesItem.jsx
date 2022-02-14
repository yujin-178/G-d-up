import React from 'react';

import { css } from '@emotion/react';

export default function ClothesItem(props) {
  const {
    item,
    onMouseOverHandler,
    OnMouseLeaveHandler,
    onClickHandler,
  } = props;

  return (
    <div css={ClothesItemBox}>
      <div css={ClothesItemImgDiv}>
        {(item && onMouseOverHandler) && (
          <img
            css={ClothesItemImg}
            width="100%"
            src={item.clothing.imageModel.imageUrl}
            onMouseOver={() => onMouseOverHandler(item)}
            onMouseLeave={OnMouseLeaveHandler}
          />
        )}
        {(item && onClickHandler) && (
          <img
            css={ClothesItemImg}
            width="100%"
            src={item.clothing.imageModel.imageUrl}
            onClick={() => onClickHandler(item)}
          />
        )}
      </div>
    </div>
  );
}

const ClothesItemBox = css`
  position: relative;
  background-color: #FFFFFF;
  width: 5.2rem;
  height: 5.2rem;
  margin: 0.45rem;
  align-self: center;
  justify-self: center;
  border-radius: 0.4rem;
  display: table;
`;

const ClothesItemImgDiv = css`
  display: table-cell;
  text-align: center;
  vertical-align: middle;

`;

const ClothesItemImg = css`
  max-width: 5rem;
  max-height: 5rem;
`;

// const image = css`
//   max-height: 100%;
//   max-width: 100%;
// `;
