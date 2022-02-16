import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setIsOpen, 
  setUsersToFollow, 
  setFollowers, 
  setFollowings, 
  followUser,
  unfollowUser,
  setSearchResult,
} from '../../slices/friendsSlice';
import { setUserName } from '../../slices/clothesSlice';
import FriendsModal from '../../components/dressroom/FriendsModal';

export default function FriendsModalContainer({ isOpen }) {
  const { userName } = useSelector(state => state.authSlice);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setUsersToFollow(userName));
    dispatch(setFollowers(userName));
    dispatch(setFollowings(userName));
  }, []);
  
  function handleClickModalClose() {
    dispatch(setIsOpen(false));
  }

  const { 
    usersToFollow,
    followers,
    followings,
    searchUserInput,
    searchedUsers
  } = useSelector(state => state.friendsSlice);

  function handleClickFollow(idx) {
    const following = usersToFollow[idx];
    dispatch(followUser({ following, userName }));
  }

  function handleClickUnfollow(idx) {
    const unfollowing = followings[idx];
    dispatch(unfollowUser({ unfollowing, userName }));
  }

  function handleChangeSearchUser(e) {
    dispatch(setSearchResult(e.target.value));
  }

  function handleClickGoToFollowing(idx) {
    const friendName = followings[idx];
    localStorage.setItem("friendName", `${friendName}` );
    dispatch(setUserName(friendName));
    dispatch(setIsOpen(false));
  }

  function handleClickGoToFollower(idx) {
    const friendName = followers[idx];
    localStorage.setItem("friendName", `${friendName}` );
    dispatch(setUserName(friendName));
    dispatch(setIsOpen(false));
  }

  function modalToggle(boolean) {
    dispatch(setIsOpen(false));
    console.log(boolean);
  }

  return (
    <FriendsModal
      isOpen={isOpen}
      usersToFollow={usersToFollow}
      onClickModalClose={handleClickModalClose}
      followers={followers}
      followings={followings}
      searchedUsers={searchedUsers}
      searchUserInput={searchUserInput}
      onClickFollow={handleClickFollow}
      onClickUnfollow={handleClickUnfollow}
      onChangeSearchUser={handleChangeSearchUser}
      onClickGoToFollowing={handleClickGoToFollowing}
      onClickGoToFollower={handleClickGoToFollower}
      modalToggle={modalToggle}
    />
  );
}
