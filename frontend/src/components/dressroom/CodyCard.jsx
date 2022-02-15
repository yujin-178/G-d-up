import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

import { css } from "@emotion/react";

export default function Card({ imgurl }) {
  const [show, setShow] = useState(false);
  const props3 = useSpring({
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show ? "0 20px 25px rgb(0 0 0 / 25%)" : "0 2px 10px rgb(0 0 0 / 8%)"
  });
  return (
    <animated.div
      css={cardStyle}
      style={props3}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <img src={imgurl} alt='codyCard' />
    </animated.div>
  );
}
const cardStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: bisque;
  width: 20rem;
  height: fit-content;
  min-height: 20rem;
  padding: 10px;
  border-radius: 10px;
`;
