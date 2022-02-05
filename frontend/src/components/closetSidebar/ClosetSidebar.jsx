import React from 'react';
import { css } from '@emotion/react'

const filters = {
  'season': ['spring', 'summer', 'autumn', 'winter'],
  'colors': [
    'f5f5dc', '000000', '964b00', '000080', '008000', '808080', 'add8e6', 'ffa500',
    'ffc0cb', '800080', 'ff0000', 'c0c0c0', '40e0d0', 'ffffff', 'ffff00'
  ]
  //'beige, black, brown, navy, green, grey, light blue, orange, pink, purple, red, silver, turquoise, white, yellow'
}

function ClosetSidebar(props) {
  const {
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
      <button onClick={toggleIsUserItem}>
        내 것만 보기 {`${isUserItem}`}
      </button>
      <ul css={seasonItems}> 계절
        {filters.season.map((item, index) => (
          <li key={index} css={ItemList}>
            <input type="checkbox" name={item} onChange={(event) => onChangeSeason(event.target.checked, item)} />
            <label htmlFor={item}>{item}</label>
          </li>
        ))}
      </ul>
      <ul css={colorItems}> 색깔
        {filters.colors.map((color, index) => {
          const isSelected = selectedColors.includes(color);
          return (
            <li key={index} css={ItemList}>
              <button
                css={colorButton({ color, isSelected })}
                onClick={() => onChangeColor(color)}
              >
              </button>
            </li>
          )
        })}
      </ul>
      <ul>
        {customTags.map((value, index) => {
          return (
            <li key={index}>
              {value}
              <button onClick={() => deleteCustomHandler(value)}>x</button>
            </li>
          )
        })}
      </ul>
    </aside>
  );
}

const sidebarStyle = css`
  position: relative;
  background-color: #FFFAFA;
  border: 1px solid blue;
  width: 300px;
  height: 50%;
  box-sizing: border-box;
  padding: 30px 20px;
`

const searchInputStyle = css`
  border: 0;
  outline: none;
  height: 35px;
  border-radius: 5px;
  width: 100%;
`

const seasonItems = css`
  font-size: 15px;
  padding: 0 5px;
`

const ItemList = css`
  text=decoration: none;
  font-size: 15px;
  display: block;
  font-weight: 600;
`

const colorItems = css`
  padding: 0 5px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`


const colorButton = ({ color, isSelected }) => css`
  background-color: #${color};
  height: 20px;
  width: 20px;
  cursor: pointer;
  border-radius: 50%;
  border: 0;
  margin: 5px;
  ${isSelected &&
  `
      border: 3px solid gold;
    `}
`

export default ClosetSidebar;
