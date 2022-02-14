import React from 'react';
import { css } from '@emotion/react';

export default function Messages({ message, subMessage }) {
  return (
    <>
      <div css={container}>
        <p css={title}>{message}</p>
        <p css={subTitle}>{subMessage}</p>
      </div>
    </>
  );
}

const container = css`
  padding: 0px 20px 50px;
  word-break: break-all;
`;

const title = css`
  font-size: 20px;
`;

const subTitle = css`
  font-size: 15px;
`;
