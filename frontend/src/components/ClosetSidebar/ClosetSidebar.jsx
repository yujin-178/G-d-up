import React from 'react';
import { css } from '@emotion/react'

export default function ClosetSidebar(props) {
  const {
    season,
    colors,
    selectedColors,
    isUserItem,
    toggleIsUserItem,
    onChangeSeason,
    onChangeColor,
    customTags,
    deleteCustomHandler,
    inputRef,
    onKeyPress,
  } = props;

  return (
    <aside css={sidebarStyle}>
      <input
        ref={inputRef}
        css={searchInputStyle}
        type="text"
        placeholder="태그 입력"
        onKeyPress={onKeyPress}
      />
      <div css={toggleContainer}>
        <div css={toggleBtn({ isUserItem })} onClick={toggleIsUserItem}>
          <div css={toggleBtnCircle({ isUserItem })}></div>
        </div>
        <p css={toggleTitle}>내 옷만 보기</p>
      </div>
      <>
        <p>🌹 season</p>
        <ul css={seasonItems}>
          {season.map((item, index) => (
            <li key={index} css={menuItem}>
              <input
                css={checkbox}
                type="checkbox"
                id={item}
                onChange={(event) => onChangeSeason(event.target.checked, item)}
              />
              <label css={checkboxTitle} htmlFor={item}>{item}</label>
            </li>
          ))}
        </ul>
      </>
      <>
        <p>✨ color</p>
        <ul css={colorItems}>
          {colors.map(({ name, code }, index) => {
            const isSelected = selectedColors.includes(name);
            return (
              <li key={index} css={menuItem}>
                <button
                  css={colorButton({ code, isSelected })}
                  onClick={() => onChangeColor(name)}
                >
                </button>
              </li>
            );
          })}
        </ul>
      </>
      <ul css={tagContainer}>
        {customTags.map((value, index) => {
          return (
            <li key={index} css={tagItem}>
              <p css={tagTitle}>{value}</p>
              <button
                css={tagDeleteBtn}
                onClick={() => deleteCustomHandler(value)}>x</button>
            </li>
          )
        })}
      </ul>
    </aside >
  );
}

const sidebarStyle = css`
  position: relative;
  width: 250px;
  height: 50%;
  box-sizing: border-box;
  padding: 30px 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.l);
  box-shadow: 0px 0px 10px rgba(1, 1, 1, 0.2);
  font-size: 20px;
  background-color: #fff;
`;

const searchInputStyle = css`
  height: 35px;
  outline: 0;
  border: 0;
  border-radius: 5px;
  border-bottom: 2px solid silver;
  width: 100%;
  font-size: 19px;
`;

const seasonItems = css`
  font-size: 15px;
  padding: 0 1px;
  list-style:none
`;

const menuItem = css`
  font-size: 15px;
  padding: 15px 0px;
`;

const colorItems = css`
  padding: 0 5px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  list-style:none;
`;

const colorButton = ({ code, isSelected }) => css`
  background-color: #${code};
  height: 25px;
  width: 25px;
  cursor: pointer;
  border-radius: 50%;
  border: 0;
  margin: 5px;
  ${isSelected &&
  `
    border: 3px solid gold;
  `}
`;

const toggleContainer = css`
  display: flex;
  padding-top: 30px;
`;

const toggleTitle = css`
  margin-left: 10px;
  margin: 0;
  padding: 5px 10px;
`;

const toggleBtn = ({ isUserItem }) => css`
  width: 60px;
  height: 30px;
  background: grey;
  border-radius: 30px;
  transition: all 300ms ease-in-out;
  ${isUserItem &&
  `
    background: #00acee;
  `}
`;

const toggleBtnCircle = ({ isUserItem }) => css`
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  transition: all 300ms ease-in-out;
  ${isUserItem &&
  `
    margin-left: 50%;
  `}
`;

const tagContainer = css`
  width: 80%;
  background-color: beige;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  list-style:none;
`;

const tagItem = css`
  position: relative;
  display: flex;
  background-color: white;
  height: 25px;
  padding: 4px;
  border-radius: 18px;
  font-size: 15px;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
  margin: 5px;
  min-width: 50px;
`;

const checkbox = css`
  vertical-align: middle;
  position: relative;
  bottom: 0.5px;
`;

const checkboxTitle = css`
  display: inline-block;
  margin-left: 10px;
`;

const tagTitle = css`
  margin: 0;
  padding: 4px;
  vertical-align: middle;
`;

const tagDeleteBtn = css`
  border:none;
  background: none;
  padding: 0px 5px 2px 0px;
  cursor: pointer;
`;
