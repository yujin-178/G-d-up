import React from 'react';
import { css } from '@emotion/react';
import { Rnd } from 'react-rnd';

export default function Item({ item, handleOnStart, handleOnStop, handleResizeStop, isActivated, deleteCodyItem }) {
  const { clothingId, image, position, size } = item;
  const { x, y, z } = position;
  const { width, height } = size;
  const border = isActivated ? '1px dashed grey' : 'none';

  return (
    <Rnd
      size={{ width, height }}
      position={{ x, y }}
      onDragStart={() => handleOnStart(item)}
      onDragStop={(e, data) => handleOnStop(clothingId, data)}
      onResizeStart={() => handleOnStart(item)}
      onResizeStop={(e, direction, ref, delta, position) => handleResizeStop(clothingId, ref, position)}
      minWidth={20}
      minHeight={20}
      maxWidth={300}
      maxHeight={300}
      bounds="parent"
      lockAspectRatio={1}
      css={itemInCanvas({ image, z, border })}
      onDoubleClick={() => deleteCodyItem(item.clothingId)}
    >
    </Rnd>
  );
}

const itemInCanvas = ({ image, z, border }) => css`
  background-color: transparent;
  background-position: center center;
  position: absolute;
  background-image: url(${image});
  background-size: contain;
  background-repeat: no-repeat;
  border: ${border};
  z-index: ${z};

`;
