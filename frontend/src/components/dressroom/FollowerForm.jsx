import React from "react";
import { css } from '@emotion/react';

export default function FollowerForm({ followers, onClickGoToFollower }) {
  return (
    <div css={container}>
      <div css={Follower}>
        {followers.map((user, idx) =>
          <li css={[ListStyle, FollowListStyle]}
            key={idx}
            onClick={() => onClickGoToFollower(idx)}
          >
            {user}
          </li>
        )}
      </div>
    </div>
  );
}

const ListStyle = css`
  padding: 0.5 10rem;
  margin: 0.7rem auto;
  list-style: none;
  display: flex;
  justify-content: space-between;
  width: 70%;
  background-color: beige;
  cursor: pointer;
`;

const FollowListStyle = css`
  &:hover {
    background-color: #E6B36D;
  }
`;

const Follower = css`
  padding: 1rem;
  text-align: center;
  height: 90%;
`;

const container = css`
  padding: 1rem;
  text-align: center;
  height: 80%;
`;
