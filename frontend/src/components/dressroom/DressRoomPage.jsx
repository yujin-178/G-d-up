import React from 'react';
import FriendsModal from './FriendsModal';
import { Link } from 'react-router-dom';

import { css } from "@emotion/react";
import dressroomBackground from '../../../public/images/dressroombackground.jpg';
import codyImg from '../../../public/images/codyBtn.svg';
import closetImg from '../../../public/images/closetBtn.svg';

import { BackBtn } from '../dressRoomCss';
import { PeopleFill } from '@emotion-icons/bootstrap/PeopleFill';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen } from '../../slices/friendsSlice';

export default function DressRoomPage() {
  const dispatch = useDispatch();

  function handleClickModal() {
    dispatch(setIsOpen(true));
  }

  function HandleRequestClose() {
    dispatch(setIsOpen(false));
    console.log('닫아!');
  }

  const { isOpen } = useSelector(state => state.friendsSlice);

  const userName = JSON.parse(localStorage.getItem('userInfo')).username;

  return (
    <div css={Container}>
      <div css={DressRoom}>
        <h2 css={Title}>{`${userName}'s 드레스룸`}</h2>
        <FriendsModal
          isOpen={isOpen}
        />
        <div css={friendsBtnDiv}>
          <PeopleFill
            css={FriendsBtn}
            onClick={handleClickModal}
            onRequestClose={HandleRequestClose}
          />
        </div>
        <div css={contentContainer}>
          <div css={[BtnItem, CodyBtn]}>
            <Link to='/cody'>
              <button css={TextButton}>
                코디 목록으로
              </button>
              <img css={Btn} src={codyImg} alt="코디버튼" />
            </Link>
          </div>
          <div css={[BtnItem, ClosetBtn]}>
            <Link to='/closet'>
              <button css={TextButton}>
                옷장 가기
              </button>
              <img css={Btn} src={closetImg} alt="코디버튼" />
            </Link>
          </div>
        </div>
        <div css={BackBtnContainer}>
          <Link to='/'>
            <button css={BackBtn}>
              뒤로
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const BackBtnContainer = css`
  display: flex;
  grid-row: 3;
  grid-column: 1;
  justify-content: end;
  margin-right: 50px;
  align-items: center;
`;

const DressRoom = css`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${dressroomBackground});
  background-size: cover;
  background-position: center;
`;

const contentContainer = css`
  display: grid;
  grid-row: 2;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const friendsBtnDiv = css`
  grid-column: 1 / 2;
  grid-row: 3 / 4;
  display: flex;
  align-items: center;
`;

const FriendsBtn = css`
  position: relative;
  margin: 1rem 5rem;
  color: #fefefe;
  width: 5rem;
  cursor: pointer;
`;

const BtnItem = css`
  width: 70%;
  height: 32%;
  margin: 4rem 5rem;
  background-color: #685f60;
  opacity: 0.8;
  grid-row: 2 / 3;
  border-radius: 4rem;
`;

const CodyBtn = css`
  grid-column: 2 / 3;
`;

const ClosetBtn = css`
  grid-column: 3 / 4;
`;

const Btn = css`
  width: 100%;
`;

const Title = css`
  padding: 2rem 0 0 0;
  font-size: 50px;
  margin-left: 30px;
  color: #f2f2f2;
  text-align : center;
`;

const Container = css`
  display: grid;
  height: 100%;
`;

const TextButton = css`
  margin: 3rem 1rem 2rem 3rem;
  padding: 0.5rem 1rem;

  font-family: "Noto Sans KR", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;

  display: inline-block;
  width: auto;

  background: #e0e0e0;
	border: none;
	border-radius: 4px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
`;
