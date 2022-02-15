import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { setIsOpen } from '../../slices/friendsSlice';

export default function FriendsModal({ isOpen }) {
  const dispatch = useDispatch();

  function handleClickSetIsopen() {
    dispatch(setIsOpen(false));
  }

  return (
    <Modal isOpen={isOpen}>
      This is Modal
      <button onClick={handleClickSetIsopen}>X</button>
    </Modal>
  );
}
