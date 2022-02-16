import React from "react";
import { css } from '@emotion/react';

export default function FollowingForm({ followings, onClickUnfollow, onClickGoToFollowing }) {
  return (
    <div css={FollowerFollowing}>
      {followings.map((user, idx) =>
        <li css={[ListStyle, FollowListStyle]} key={idx}>
          <span css={SpanStyle} onClick={() => onClickGoToFollowing(idx)}>{user}</span>
          <button
            css={[FollowItem, UnfollowBtn]}
            onClick={() => onClickUnfollow(idx)}
          >
            언팔로우
          </button>
        </li>
      )}
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
`;

const SpanStyle = css`
  width: 80%;
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
  cursor: pointer;
`;

const FollowListStyle = css`
  &:hover {
    background-color: #E6B36D;
  }
`;

const FollowerFollowing = css`
  padding: 1rem;
  text-align: center;
`;
