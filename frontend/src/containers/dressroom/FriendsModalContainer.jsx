import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setIsOpen, 
  setUsersToFollow, 
  setFollowers, 
  setFollowings, 
  followUser,
  unfollowUser,
} from '../../slices/friendsSlice';
import FriendsModal from '../../components/dressroom/FriendsModal';

const userName = 'admin';

export default function FriendsModalContainer({ isOpen }) {
  const dispatch = useDispatch();

  function handleClickModalClose() {
    dispatch(setIsOpen(false));
  }

  useEffect(() => {
    dispatch(setUsersToFollow(userName));
    dispatch(setFollowers(userName));
    dispatch(setFollowings(userName));
  }, []);

  const { usersToFollow, followers, followings } = useSelector(state => state.friendsSlice);

  function handleClickFollow(idx) {
    const following = usersToFollow[idx];
    dispatch(followUser({ following, userName }));
  }

  function handleClickUnfollow(idx) {
    const unfollowing = followings[idx];
    dispatch(unfollowUser({ unfollowing, userName }));
  }

  return (
    <FriendsModal
      isOpen={isOpen}
      usersToFollow={usersToFollow}
      onClickModalClose={handleClickModalClose}
      followers={followers}
      followings={followings}
      onClickFollow={handleClickFollow}
      onClickUnfollow={handleClickUnfollow}
    />
  );
}
