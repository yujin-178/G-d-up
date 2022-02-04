import React from 'react';

import { css, jsx } from "@emotion/react";

export default function ClosetItemListContainer() {
  const ItemContainer = css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 0.5rem;
    background-color: #BFAEA4;
    width: 25rem;
    height: 25em;
  `
  const ClothesItem = css`
    position: relative;
    background-color: #FFFFFF;
    width: 5rem;
    height: 5rem;
    margin: 0.5rem;
    align-self: center;
    justify-self: center;
  `

  return (
    <div>
      <h5>목록</h5>
      <div css={ItemContainer}>
        <div css={ClothesItem}>
        </div>
        <div css={ClothesItem}>
        </div>
        <div css={ClothesItem}>
        </div>
        <div css={ClothesItem}>
        </div>
        <div css={ClothesItem}>
        </div>
        <div css={ClothesItem}>
        </div>
        <div css={ClothesItem}>
        </div>
        <div css={ClothesItem}>
        </div>
        <div css={ClothesItem}>
        </div>
        <div css={ClothesItem}>
        </div>
        <div css={ClothesItem}>
        </div>
        <div css={ClothesItem}>
        </div>
        <div css={ClothesItem}>
        </div>
        <div css={ClothesItem}>
        </div>
        <div css={ClothesItem}>
        </div>
        <div css={ClothesItem}>
        </div>
      </div>
    </div>
  )
}
