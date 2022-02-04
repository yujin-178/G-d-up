import React from 'react';

import { css } from '@emotion/react';

const ClothesItemBox = css`
  position: relative;
  background-color: #FFFFFF;
  width: 5rem;
  height: 5rem;
  margin: 0.5rem;
  align-self: center;
  justify-self: center;
`

export default function ClothesItem() {
  return (
    <div css={ClothesItemBox}>
    </div>
  )
}
