import React from 'react';
import Modal from 'react-modal';
import { css } from '@emotion/react';

export default function FriendsModal({ 
  isOpen,
  usersToFollow,
  onClickModalClose,
  onClickFollow,
  followers,
  followings
}) {
  return (
    <Modal css={FriendsModalStyle} isOpen={isOpen}>
      <div css={CloseBtn}>
        <button onClick={onClickModalClose}>X</button>
      </div>
      <div css={GridWrapper}>
        <div css={UsersToFollow}>
          <h2>팔로우가능한사람</h2>
          {usersToFollow.map((user, idx) =>
            <li css={ListStyle} key={idx}>
              {user}
              <button css={FollowItem} onClick={() => onClickFollow(idx)}> 팔로우 </button>
            </li>
          )}
        </div>
        <div css={FollowerFollowing}>
          <div>
            <h2>팔로워</h2>
            {followers.map((user, idx) =>
              <li css={ListStyle} key={idx}>
                {user}
              </li>
            )}
          </div>
          <div>
            <h2>팔로잉</h2>
            {followings.map((user, idx) =>
              <li css={ListStyle} key={idx}>
                {user}
                <button css={[FollowItem, UnfollowBtn]}> 언팔로우 </button>
              </li>
            )}
          </div>
        </div>
      </div>

      {/* <input type="text" placeholder='친구이름을 입력하세요'/> */}

    </Modal>
  );
}

const FriendsModalStyle = css`
  margin: 7% auto;
  width: 50%;
  height: 70vh;
  background-color: #fefefe;
  opacity: 0.8;
`;

const CloseBtn = css`
  margin: 1rem 1rem 1rem 10rem,
`;

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

const GridWrapper = css`
  display: grid;
  grid-template-columns: 50% 50%;
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
  margin: 1rem;
  padding: 1rem;
  grid-column: 1 / 2;
  text-align: center;
`;

const FollowerFollowing = css`
  margin: 1rem;
  padding: 1rem;
  grid-column: 2 / 3;
  text-align: center;
`;
