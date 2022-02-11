import React from 'react';
import { css } from '@emotion/react';

export default function LaundryItem({ kind, range, iconSelect, selectedIcon }) {
  return (
    <div>
      <h3>{kind}</h3>
      <div css={detail}>
        {range.map((i) => {
          const select = selectedIcon.includes(i);
          return (
            <img src={process.env.PUBLIC_URL + `laundry/${i}.png`} alt={i}
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
	${select &&
  `
			color: #00acee;
			border-bottom: 2px solid #00acee;
		`}
`;

const detail = css`
	display: grid;
	grid-template-columns: repeat(7,1fr);
	grid-gap : 10px;
`;
