import React from 'react';

import { css } from '@emotion/react';

export default function ClothesItem({ item }) {
  return (
    <div css={ClothesItemBox}>
      { item && <p>{ item.image }</p> }
    </div>
  );
}

const ClothesItemBox = css`
  position: relative;
  background-color: #FFFFFF;
  width: 5rem;
  height: 5rem;
  margin: 0.5rem;
  align-self: center;
  justify-self: center;
`;
