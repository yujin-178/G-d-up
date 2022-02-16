import React from "react";
import { css } from '@emotion/react';
import { Hr, ListStyle } from '../resusableCss';

export default function FollowingForm({ followings, onClickUnfollow, onClickGoToFollowing }) {
  return (
    <div css={FollowerFollowing}>
      {followings.map((user, idx) =>
        <>
          <li css={[ListStyle]} key={idx}>
            <span css={SpanStyle} onClick={() => onClickGoToFollowing(idx)}>{user}</span>
            <button
              css={[FollowItem, UnfollowBtn]}
              onClick={() => onClickUnfollow(idx)}
            >
              언팔로우
            </button>
          </li>
          <hr css={Hr}/>
        </>
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
  cursor: pointer;
`;

const SpanStyle = css`
  width: 80%;
`;

const UnfollowBtn = css`
  width: 5rem;
`;

const FollowerFollowing = css`
  padding: 1rem;
  text-align: center;
`;
