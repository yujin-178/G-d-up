import React from 'react';
import { css } from '@emotion/react';

export default function LaundryItem({ images, kind, range, iconSelect, selectedIcon }) {
  return (
    <div>
      <p css={label}>{kind}</p>
      <div css={detail}>
        {range.map((i) => {
          const select = selectedIcon.includes(i);
          const image = images[i];
          return (
            <img src={image} alt={i}
              key={i}
              css={imgStyle({ select })}
              onClick={() => iconSelect(i)}
            />
          );
        })}
      </div>
    </div>
  );
}

const imgStyle = ({ select }) => css`
	border: 1px solid;
  cursor:pointer;
	${select &&
  `
		color: #00acee;
		border: 3px solid #00acee;
	`}
`;

const detail = css`
	display: grid;
	grid-template-columns: repeat(8,1fr);
	grid-gap : 10px;
`;

const label = css`
  margin-bottom: 10px;
`;
