import React from "react";
import { css } from '@emotion/react';
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

const FollowItem = css`
  width: 4rem;
  height: 1.3rem;
  background: #ecc194;
	border: none;
	border-radius: 4px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
`;

const ListStyle = css`
  padding: 0.5 10rem;
  margin: 0.7rem auto;
  list-style: none;
  display: flex;
  justify-content: space-between;
  width: 70%;
  background-color: beige;
`;

const UsersToFollowStyle = css`
  padding: 1rem;
  text-align: center;
  height: 95%;
`;

const InputStyle = css`
  width: 50%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
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
