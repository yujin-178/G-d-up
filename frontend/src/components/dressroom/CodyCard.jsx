import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

import { css } from "@emotion/react";

export default function Card({ imgurl, card }) {
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
      <img src={imgurl} alt='codyCard' css={imgStyle} />
      {card ?
        <div css={content}>{card.content}</div>
        :
        <div css={content}>내용 없음</div>
      }
    </animated.div>
  );
}
const cardStyle = css`
  border : 2px solid;
  border-color: #685f60;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 330px;
  padding: 10px;
  margin: 10px;
`;

const imgStyle = css`
  margin-top: 20px;
  width: 90%
`;

const content = css`
  padding: 15px;
  font-size: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 150px;
  height: 20px;
  font-family: 'BBTreeCB';
`;
