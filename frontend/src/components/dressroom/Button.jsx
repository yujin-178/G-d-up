import React from 'react';
import { css } from '@emotion/react';

export default function Button({ title, onClick, color }) {
  return (
    <button css={button({ color })} className="hvr-fade" onClick={onClick}>{title}</button>
  );
}

const button = ({ color  }) => css`
  background-color: ${color};
  padding: 5px 6px;
  cursor: pointer;
  margin: 10px;
  width: 5rem;
  height: 30px;
  position: relative;
  float: right;
  border: 1px solid grey;
`;
