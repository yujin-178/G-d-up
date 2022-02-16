import React, { useEffect } from 'react';
import { css } from '@emotion/react';

export default function Modal({ children }) {
  useEffect(() => {
    document.body.style.cssText = 'margin: 0; padding: 0; height: 100vh; overflow: hidden;';

    return () => {
      document.body.style.cssText = 'margin: 0; padding: 0; overflow: auto;';
    };
  }, []);

  return (
    <>
      <div css={ModalOverlay}></div>
      <div css={ModalWrapper}>
        <div css={ModalContents}>
          { children }
        </div>
      </div>
    </>
  );
}

const ModalWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 500;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 499;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContents = css`
  position: relative;
  width: 22vw;
  padding: 20px;
  z-index: 1000;
  background-color: #f2f1ef;
  border-radius: 5px;
`;
