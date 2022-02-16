import { css } from '@emotion/react';

export const LivingRoom = css`
  margin: 10rem auto;
  width: 85rem;
  height: 50rem;
  background-image: url("/images/homebackground.jpg");
  background-size: cover;
  background-position: center;
`;

export const ListStyle = css`
  padding: 0.5 10rem;
  margin: 0.7rem auto;
  list-style: none;
  display: flex;
  justify-content: space-between;
  width: 70%;
  background-color: #fefefe;
  color: #3B3532;
  cursor: pointer;
  &:hover {
    background-color: #BFAEA4;
    opacity: 0.8;
    color: #fefefe;
  }
`;

export const Hr = css`
  width: 70%;
  color: #BFAEA4;
`;
