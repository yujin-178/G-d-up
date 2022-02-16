import React from "react";
import { css } from '@emotion/react';

export default function FollowerFollowingForm({followers, followings, onClickUnfollow}) {
  return (
    <div css = {container}>
      <div css={UsersToFollow}>
        <h2>팔로워</h2>
        {followers.map((user, idx) =>
          <li css={ListStyle} key={idx}>
            {user}
          </li>
        )}
      </div>
      <div css={FollowerFollowing}>
        <h2>팔로잉</h2>
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

const UsersToFollow = css`
  padding: 1rem;
  grid-column: 1 / 2;
  text-align: center;
`;

const FollowerFollowing = css`
  padding: 1rem;
  grid-column: 2 / 3;
  text-align: center;
`;

const container = css`
  padding: 1rem;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 95%;
`;