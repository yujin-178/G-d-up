import React from 'react';
import { css } from '@emotion/react';
import { Rnd } from 'react-rnd';

export default function Item({ item, handleOnStart, handleOnStop, handleResizeStop }) {
  const { clothingId, image, position, size } = item;
  const { x, y, z } = position;
  const { width, height } = size;

  return (
    <>
      <Rnd
        size={{ width, height }}
        position={{ x, y }}
        onDragStart={() => handleOnStart(item)}
        onDragStop={(e, data) => handleOnStop(clothingId, data)}
        onResizeStart={() => handleOnStart(item)}
        onResizeStop={(e, direction, ref) => handleResizeStop(clothingId, ref)}
        minWidth={20}
        minHeight={20}
        maxWidth={300}
        maxHeight={300}
        bounds="parent"
        css={z_index({ z })}
      >
        <div css={itemInCanvas({ image, width, height })}></div>
      </Rnd>
    </>
  );
}

const z_index = ({ z, width, height }) => css`
  z-index: ${z};
  width: ${width}px;
  height: ${height}px;
`;

const itemInCanvas = ({ image, width, height }) => css`
  background-color: transparent;
  background-position: center center;
  position: absolute;
  background-image: url(${image});
  background-size: contain;
  background-repeat: no-repeat;
  border: 1px solid grey;
  width: ${width};
  height: ${height};
`;
