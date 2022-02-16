import React, { useState } from 'react';
import Modal from 'react-modal';
import { css } from '@emotion/react';
import UsersToFollowForm from './UsersToFollowForm';
import FollowerForm from './FollowerForm';
import FollowingForm from './FollowingForm';
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
    0: <FollowerForm
      followers={followers}
      onClickGoToFollower={onClickGoToFollower}
    />,
    1: <FollowingForm
      followings={followings}
      onClickUnfollow={onClickUnfollow}
      onClickGoToFollowing={onClickGoToFollowing}
    />,
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
          <div css={FriendsModalTitle}>
            <h2>친구 목록</h2>
          </div>
          <div css={GridWrapper}>
            <UsersToFollowForm
              css={UsersToFollowStyle}
              onChangeSearchUser={onChangeSearchUser}
              searchedUsers={searchedUsers}
              searchUserInput={searchUserInput}
              usersToFollow={usersToFollow}
              onClickFollow={onClickFollow}
            />
            <div>
              <ul id="tabs">
                <li id={activeId === 0 ? "current" : "after"} onClick={() => clickHandler(0)}><a href="#" name="tab1">팔로워</a></li>
                <li onClick={() => clickHandler(1)}><a href="#" name="tab2">팔로잉</a></li>
              </ul>
              <div css={contentArea}>{obj[activeId]}</div>
            </div>
          </div>
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
  border: 0.5rem solid #80746E;
`;

const mainDiv = css`
  background-color: #BFAEA4;
  height: 70%;
`;

const FriendsModalTitle = css`
  margin: 2rem 1rem 2rem 1rem;
  text-align: center;
  padding: 0;
  color: #CAE7FA;
  font-weight: 100;
  font-size: 1.2rem;
`;

const CloseBtn = css`
  text-align: right;
  height: 5%;
`;

const CloseBtnImg = css`
  padding: 1%;
  cursor:pointer;
`;

const UsersToFollowStyle = css`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
`;

const GridWrapper = css`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const inBox = css`
  padding: 2%;
  height: 100%;
`;

const contentArea = css`
  background-color: #fefefe;
  height:100%;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`;
