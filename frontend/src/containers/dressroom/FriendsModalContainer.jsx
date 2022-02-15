import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen, setUsersToFollow } from '../../slices/friendsSlice';
import FriendsModal from '../../components/dressroom/FriendsModal';

const userName = 'admin';

export default function FriendsModalContainer({ isOpen }) {
  const dispatch = useDispatch();

  function handleClickModalClose() {
    dispatch(setIsOpen(false));
  }

  useEffect(() => {
    dispatch(setUsersToFollow(userName));
  }, []);

  const { usersToFollow } = useSelector(state => state.friendsSlice);

  console.log(`usersToFollow is ${usersToFollow}`);
  return (
    <FriendsModal
      isOpen={isOpen}
      usersToFollow={usersToFollow}
      onClickModalClose={handleClickModalClose}
    />
  );
}
