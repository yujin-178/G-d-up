import React from "react";
import { css } from '@emotion/react';
import { ListStyle, Hr } from '../resusableCss';
import searchImg from '../../../public/images/search.png';

export default function UsersToFollowForm({ onChangeSearchUser, searchedUsers, searchUserInput, usersToFollow, onClickFollow }) {
  return (
    <div css={UsersToFollowStyle}>
      <input
        css={InputStyle}
        type="text"
        placeholder='친구 이름을 입력하세요.'
        onChange={onChangeSearchUser}
      />
      <div css={ScrollStyle}>
        {searchedUsers.length === 0 && searchUserInput.length === 0 &&
          <div css={ScrollStyle}>
            {usersToFollow.map((user, idx) =>
              <>
                <li css={ListStyle} key={idx}>
                  {user}
                  <button
                    css={FollowItem}
                    onClick={() => onClickFollow(idx)}
                  >
                    팔로우
                  </button>
                </li>
                <hr css={Hr}/>
              </>
            )}
          </div>
        }
        {searchedUsers.length > 0 &&
          <div css={ScrollStyle}>
            {searchedUsers.map((user, idx) =>
              <li css={ListStyle} key={idx}>
                {user}
                <button
                  css={FollowItem}
                  onClick={() => onClickFollow(idx)}
                >
                  팔로우
                </button>
              </li>
            )}
          </div>
        }
      </div>
    </div>
  );
}

const UsersToFollowStyle = css`
  padding: 1rem;
  text-align: center;
  width: 40%;
  height: 95%;
  background-color: #fefefe;
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

const InputStyle = css`
  width: 70%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  font-size: 16px;
  background-color: white;
  background-image: url(${searchImg});
  background-position: 10px 10px; 
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;
  margin: 2%;
`;

const ScrollStyle = css`
  height: 88%;
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
