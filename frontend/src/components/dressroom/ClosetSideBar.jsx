import React from 'react';
import { css } from '@emotion/react';
import TagSearchBar from './TagSearchBar';
import Tag from './Tag';

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
    deleteTagHandler,
    inputRef,
    onKeyPress,
  } = props;

  return (
    <aside css={sidebarStyle}>
      <TagSearchBar
        inputRef={inputRef}
        onKeyPress={onKeyPress}
      />
      {/* <div css={toggleContainer}>
        <div
          data-testid="toggle"
          css={toggleBtn({ isUserItem })}
          onClick={toggleIsUserItem}>
          <div css={toggleBtnCircle({ isUserItem })}></div>
        </div>
        <p css={toggleTitle}>내 옷만 보기</p>
      </div> */}
      <>
        <p>🌹 season</p>
        <ul css={seasonItems}>
          {season.map((item, index) => (
            <li key={index} css={menuItem}>
              <input
                data-testid={item}
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
            const colorCode = code || 'linear-gradient(to right, blue, green, yellow, pink, red)';
            return (
              <li key={index} css={menuItem}>
                <button
                  data-testid={name}
                  css={colorButton({ colorCode, isSelected })}
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
            <Tag
              key={index}
              value={value}
              deleteTagHandler={deleteTagHandler}
            />
          );
        })}
      </ul>
    </aside >
  );
}

const sidebarStyle = css`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  position: relative;
  width: 90%;
  height: 100%;
  box-sizing: border-box;
  margin: 1rem 1rem;
  padding: 1rem 1rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.l);
  box-shadow: 0px 0px 10px rgba(1, 1, 1, 0.2);
  font-size: 20px;
  background-color: #fff;
  border-radius: 0.7rem;
`;

const seasonItems = css`
  font-size: 15px;
  padding: 0 1px;
  list-style:none
`;

const menuItem = css`
  font-size: 15px;
  padding: 0.2rem 0px;
`;

const colorItems = css`
  padding: 0 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  list-style:none;
`;

const colorButton = ({ colorCode, isSelected }) => css`
  background: ${colorCode};
  height: 1.3rem;
  width: 1.3rem;
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

const checkbox = css`
  vertical-align: middle;
  position: relative;
  bottom: 0.5px;
`;

const checkboxTitle = css`
  display: inline-block;
  margin-left: 10px;
`;
