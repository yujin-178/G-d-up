import React, { useState } from 'react';
import FriendsModalContainer from '../../containers/dressroom/FriendsModalContainer';
import { Link } from 'react-router-dom';

import { css } from "@emotion/react";
import dressroomBackground from '../../../public/images/dressroombackground.jpg';
import codyImg from '../../../public/images/codyBtn.svg';
import closetImg from '../../../public/images/closetBtn.svg';
import '../../css/hover.css';

import { BackBtn } from '../dressRoomCss';
import { PeopleFill } from '@emotion-icons/bootstrap/PeopleFill';
import { useSelector } from 'react-redux';

export default function DressRoomPage({ onClickModalOpen, onClickToMyDressRoom, userName, isMyRoom }) {

  const { isOpen } = useSelector(state => state.friendsSlice);
  const [hover, setHover] = useState(false);

  return (
    <div css={Container}>
      <div css={DressRoom}>
        {isMyRoom ?
          <h2 css={Title}>{`${userName}님의 드레스룸`}</h2>
          :
          <h2 css={Title}>{`${userName}님의 드레스룸에 오신걸 환영합니다!`}</h2>
        }
        <FriendsModalContainer
          isOpen={isOpen}
        />
        <div css={friendsBtnDiv}>
          <PeopleFill
            css={FriendsBtn}
            onClick={onClickModalOpen}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />
          {hover ?
            <p className="arrow_box">친구 목록</p>
            :
            ''
          }
        </div>
        <div css={contentContainer}>
          <Link to='/cody' className={'hvr-bob'} css={[BtnDiv, CodyBtnDiv, LinkStyle]}>
            <div css={BtnItem}>
              <p css={BtnText}>{isMyRoom ? '코디 목록 보기' : '코디 목록 구경'} </p>
              <img css={[BtnImg, CodyBtnImg]} src={codyImg} alt="코디버튼" />
            </div>
          </Link>
          <Link to='/closet' className={'hvr-bob'} css={[BtnDiv, ClosetBtnDiv, LinkStyle]}>
            <div css={BtnItem}>
              <p css={BtnText}>{isMyRoom ? '옷장 가기' : '옷장 구경'} </p>
              <img css={BtnImg} src={closetImg} alt="옷장버튼" />
            </div>
          </Link>
        </div>
        <div css={BackBtnContainer}>
          {!isMyRoom &&
            <div>
              <button onClick={onClickToMyDressRoom}
                css={toMyDress}
                className="hvr-fade"
              >
                My DressRoom
              </button>
            </div>
          }
          <Link to='/'>
            <button css={BackBtn} className="hvr-fade">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const toMyDress = css`
  position: absolute;
  right: 18rem;
  bottom: 35px;
  width: 90px;
  height: 40px;
  background-color: white;
  color: white;
  border: 1.5px solid white;
  background-color: #2E2E2E;
  cursor: pointer;
`;

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
  background-image: linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${dressroomBackground});
  background-size: cover;
  background-position: center;
`;

const contentContainer = css`
  display: grid;
  grid-row: 2;
  grid-template-columns: minmax(10rem, 25%) 1fr 1fr minmax(10rem, 25%);
  grid-column-gap: 3.5%;
`;

const LinkStyle = css`
  text-decoration: none;
  text-align: center;
`;

const friendsBtnDiv = css`
  grid-column: 1 / 2;
  grid-row: 3 / 4;
  display: flex;
  align-items: center;
`;

const FriendsBtn = css`
  position: absolute;
  left: 50px;
  bottom: 35px;

  margin-left : 5rem;
  color: #fefefe;
  width: 5rem;
  cursor: pointer;
  &:hover {
    color: #7DDAD5;
  }
`;

const BtnDiv = css`
  margin: 5% auto;
  padding: 2% 5% 5% 5%;
  width: 75%;
  height: 100%;
  background-color: #4682B4;
  cursor: pointer;
  &: hover {
    border: 0.35rem solid #7DDAD5;
  }
`;

const CodyBtnDiv = css`
  grid-column: 2 / 3;
`;

const ClosetBtnDiv = css`
  grid-column: 3 / 4;
`;

const BtnItem = css`
  width: 90%;
  height: 90%;
  margin: 1% auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BtnText = css`
  color: #fefefe;
  font-size: 2rem;
  font-weight: 450;
`;

const BtnImg = css`
  width: 90%;
  height: 70%;
  margin: 2%;
`;

const CodyBtnImg = css`
  width: 90%;
  height: 70%;
  margin: 9% 2% 2% 2%;
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
