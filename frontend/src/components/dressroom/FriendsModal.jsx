import React from 'react';
import Modal from 'react-modal';
import { css } from '@emotion/react';

export default function FriendsModal(props) {
  const { isOpen, usersToFollow, onClickModalClose } = props;
  console.log(props);
  return (
    <Modal css={FriendsModalStyle} isOpen={isOpen}>
      팔로우가능한사람 {usersToFollow}
      This is Modal
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
