import React from "react";
import { css } from '@emotion/react';

export default function FollowingForm({ followings, onClickUnfollow }) {
  return (
    <div css={container}>
      <div css={FollowerFollowing}>
        {followings.map((user, idx) =>
          <li css={ListStyle} key={idx}>
            {user}
            <button
              css={[FollowItem, UnfollowBtn]}
              onClick={() => onClickUnfollow(idx)}
            >
              언팔로우
            </button>
          </li>
        )}
      </div>
    </div>
  );
}

const FollowItem = css`
  width: 4rem;
  height: 1.3rem;
  background: #ecc194;
	border: none;
	border-radius: 4px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
`;

const UnfollowBtn = css`
  width: 5rem;
`;

const ListStyle = css`
  padding: 0.5 10rem;
  margin: 0.7rem auto;
  list-style: none;
  display: flex;
  justify-content: space-between;
  width: 70%;
  background-color: beige;
`;

const FollowerFollowing = css`
  padding: 1rem;
  text-align: center;
`;

const container = css`
  padding: 1rem;
  text-align: center;
  height: 95%;
`;
