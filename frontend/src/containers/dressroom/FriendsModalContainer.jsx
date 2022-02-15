import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen, setUsersToFollow, setFollowers, setFollowings } from '../../slices/friendsSlice';
import FriendsModal from '../../components/dressroom/FriendsModal';

const userName = 'admin';

export default function FriendsModalContainer({ isOpen }) {
  const dispatch = useDispatch();

  function handleClickModalClose() {
    dispatch(setIsOpen(false));
  }

  function handleClickFollow() {
    console.log('클릭@!');
  }

  useEffect(() => {
    dispatch(setUsersToFollow(userName));
    dispatch(setFollowers(userName));
    dispatch(setFollowings(userName));
  }, []);

  const { usersToFollow, followers, followings } = useSelector(state => state.friendsSlice);

  console.log(`usersToFollow is ${usersToFollow}`);
  return (
    <FriendsModal
      isOpen={isOpen}
      usersToFollow={usersToFollow}
      onClickModalClose={handleClickModalClose}
      followers={followers}
      followings={followings}
      onClickFollow={handleClickFollow}
    />
  );
}
