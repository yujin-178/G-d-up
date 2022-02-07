import React from 'react';

import { css } from '@emotion/react';

export default function ClothesItem() {
  return (
    <div css={ClothesItemBox}>
    </div>
  )
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
