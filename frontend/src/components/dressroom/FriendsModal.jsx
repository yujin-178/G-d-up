import React from 'react';
import Modal from 'react-modal';
import { css } from '@emotion/react';

export default function FriendsModal( { isOpen, usersToFollow, onClickModalClose, followers }) {
  return (
    <Modal css={FriendsModalStyle} isOpen={isOpen}>
      <div>
        팔로우가능한사람 {usersToFollow}
      </div>
      <div>
        팔로워 {followers}
      </div>
      <button onClick={onClickModalClose}>X</button>
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
