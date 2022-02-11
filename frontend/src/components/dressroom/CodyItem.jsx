import React from 'react';
import { css } from '@emotion/react';
import Draggable from 'react-draggable';

export default function Item({ item, handleOnStart, handleOnStop }) {
  const { clothingId, image, position } = item;
  const { x, y, z } = position;

  return (
    <Draggable
      bounds="parent"
      onStop={(e, data) => handleOnStop(clothingId, data)}
      onStart={() => handleOnStart(item)}
      defaultPosition={{ x, y }}
    >
      <div css={itemInCanvas({ image, z })}></div>
    </Draggable>
  );
}

const itemInCanvas = ({ image, z }) => css`
  background-color: transparent;
  background-position: center center;
  position: absolute;
  width: 150px;
  height: 150px;
  background-image: url(${image});
  background-size: contain;
  background-repeat: no-repeat;
  z-index: ${z};
`;
