import React, { useState } from 'react';
import Modal from 'react-modal';
import { css } from '@emotion/react';
import UsersToFollowForm from './UsersToFollowForm';
import FollowerFollowingForm from './FollowerFollowingForm';
import '../TabCss.css';
import xSymbol from '../../../public/images/xSymbol.png';

// tab 참고 https://catalin.red/dist/uploads/2012/01/css3-jquery-folder-tabs.html

export default function FriendsModal({
  isOpen,
  usersToFollow,
  onClickModalClose,
  onClickFollow,
  onClickUnfollow,
  onChangeSearchUser,
  onClickGoToFollowing,
  onClickGoToFollower,
  followers,
  followings,
  searchedUsers,
  searchUserInput,
}) {

  const obj = {
    0: <UsersToFollowForm
      onChangeSearchUser={onChangeSearchUser}
      searchedUsers={searchedUsers}
      searchUserInput={searchUserInput}
      usersToFollow={usersToFollow}
      onClickFollow={onClickFollow} />,
    1: <FollowerFollowingForm
      followers={followers}
      followings={followings}
      onClickUnfollow={onClickUnfollow} />,
  };

  const [activeId, setActiveId] = useState(0);

  const clickHandler = (id) => setActiveId(id);

  return (
    <Modal css={FriendsModalStyle} isOpen={isOpen}>
      <div css={mainDiv}>
        <div css={CloseBtn}>
          <img css={CloseBtnImg} src={xSymbol} onClick={onClickModalClose}></img>
        </div>
        <div css={inBox}>
          <ul id="tabs">
            <li id={activeId === 0 ? "current" : "after"} onClick={() => clickHandler(0)}><a href="#" name="tab1">팔로우가능한사람</a></li>
            <li onClick={() => clickHandler(1)}><a href="#" name="tab2">팔로워 & 팔로잉</a></li>
          </ul>
          <div css={contentArea}>{obj[activeId]}</div>
        </div>
      </div>
    </Modal >
  );
}

const FriendsModalStyle = css`
  margin: 7% auto;
  width: 50%;
  height: 70%;
  background-color: #BFAEA4;
  opacity: 0.9;
`;

const CloseBtn = css`
  text-align: right;
  height: 5%;
`;

const CloseBtnImg = css`
  padding: 1%;
  cursor:pointer;
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
  cursor: pointer;
`;

const FollowListStyle = css`
  &:hover {
    background-color: #E6B36D;
  }
`;

const SpanStyle = css`
  width: 80%;
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

const inBox = css`
  padding: 2%;
  height: 90%;
`;

const mainDiv = css`
  // background-color: beige;
  height: 100%;
`;

const contentArea = css`
  background-color: #fefefe;
  height:90%;
`;