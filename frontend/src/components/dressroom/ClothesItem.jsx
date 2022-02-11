import React from 'react';

import { css } from '@emotion/react';

export default function ClothesItem(props) {
  // 현재는 만약 onClickHandler를 받는다면 cody관련 로직
  // mouseOver와 mouseLeave는 clohesDetail 관련 로직
  // hover기능을 넣을지 논의 후 refactoring 예정
  const {
    item,
    onMouseOverHandler,
    OnMouseLeaveHandler,
    onClickHandler,
  } = props;

  return (
    <div
      css={ClothesItemBox}
      onClick={() => onClickHandler(item)}
    >
      {item && (
        <img
          css={image}
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

const image = css`
  max-height: 100%;
  max-width: 100%;
`;
