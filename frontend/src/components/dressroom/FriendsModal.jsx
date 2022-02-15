import React from 'react';
import Modal from 'react-modal';
import { css } from '@emotion/react';

export default function FriendsModal({ isOpen, usersToFollow, onClickModalClose, followers, followings }) {
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
              <button css={FollowItem}> 팔로우 </button>
            </li>
          )}
        </div>
        <div css={FollowerFollowing}>
          <div>
            <h2>팔로워</h2>
            {followers.map((user, idx) =>
              <li css={ListStyle} key={idx}>
                {user}
                <button css={FollowItem}> 언팔로우 </button>
              </li>
            )}
          </div>
          <div>
            <h2>팔로잉</h2>
            {followings.map((user, idx) =>
              <li css={ListStyle} key={idx}>
                {user}
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
  margin: 0 1rem;
`;

const GridWrapper = css`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const ListStyle = css`
  list-style: none;
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin: 0.5rem auto;
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
