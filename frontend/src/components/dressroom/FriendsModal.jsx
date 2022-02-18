import React, { useState } from 'react';
import Modal from 'react-modal';
import { css, Global } from '@emotion/react';
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
  modalToggle,
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
    <>
      <Global
        styles={modalClass}
      />
      <Modal
        css={FriendsModalStyle}
        isOpen={isOpen}
        onRequestClose={() => modalToggle(false)}
        closeTimeoutMS={500}
      >
        <div css={mainDiv}>
          <div css={CloseBtn}>
            <img css={CloseBtnImg} src={xSymbol} onClick={onClickModalClose}></img>
          </div>
          <div css={inBox}>
            <div css={FriendsModalTitleDiv}>
              <h2 css={FriendsModalTitle}>친구 목록</h2>
            </div>
            <div css={FlexWrapper}>
              <UsersToFollowForm
                onChangeSearchUser={onChangeSearchUser}
                searchedUsers={searchedUsers}
                searchUserInput={searchUserInput}
                usersToFollow={usersToFollow}
                onClickFollow={onClickFollow}
              />
              <div css={UsersToFollowStyle}>
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
    </>
  );
}

const UsersToFollowStyle = css`
  padding: 1rem;
  text-align: center;
  width: 40%;
  height: 95%;
  background-color: #fefefe;
`;

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

const FriendsModalTitleDiv = css`
  margin: 1rem 1rem 2rem 1rem;
  text-align: center;
  padding: 0;
`;

const FriendsModalTitle = css`
  color: #fefefe;
  font-weight: 400;
  font-size: 2.75rem;
  margin: 0.3rem 0;
`;

const CloseBtn = css`
  text-align: right;
  height: 5%;
`;

const CloseBtnImg = css`
  padding: 1%;
  cursor:pointer;
`;

const FlexWrapper = css`
  display: flex;
  justify-content: space-around;
  height: 100%;
`;

const inBox = css`
  padding: 2%;
  height: 100%;
`;

const contentArea = css`
  background-color: #fefefe;
  height: 88%;
  grid-column: 2 / 3;
  grid-row: 2 / 3;

  // height: 88%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background: #ffffff;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3.5px;
    background-color: #BFAEA4;

    &:hover {
      background-color: #BFAEA4;
    }
  }
  &::-webkit-scrollbar-track {
    background: #ffffff;
  }
`;

const modalClass = css`
.ReactModal__Overlay {
  position: fixed;
	width: 100%;
	height: 100%;
	overflow-y: hidden;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
  background-color: #BFAEA4;
	opacity: 0;
	transition-property: background-color, opacity;
	transition-duration: 500ms;
	transition-timing-function: ease-in-out;
}
.ReactModal__Overlay--after-open {
	background-color: #BFAEA4;
	opacity: 1;
}

.ReactModal__Overlay--before-close {
	background-color: #BFAEA4;
	opacity: 0;
}

.ReactModal__Content {
  height: 0%;
	width: 0%;
	background-color: transparent;
	transition-property: background-color, width, height;
	transition-duration: 500ms;
	transition-timing-function: ease-in-out;
}
.ReactModal__Content--after-open {
	width: 50%;
	height: 70%;
}
.ReactModal__Content--before-close {
	width: 0%;
	height: 0%;
	background-color: transparent;
}
`;
