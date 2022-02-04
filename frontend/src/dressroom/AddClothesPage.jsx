import React from 'react';
import { css, jsx } from '@emotion/react';

export default function AddClothesPage({onImgChange, preview, imgInput}) {
  const previewImg = css`
    width: 500px;
    height: auto;

  `
  const inputTag = css`
    display : none;
  `
  
  const inputBtn = css`
    background: #faf6f3;
    border-radius: 3;
    height: 30px;
    padding: 0 30px;
  `

  return (
    <div>
      <h5>옷 추가</h5>
      <div>
        <img 
        src={preview} 
        css={previewImg}/>
      </div>
      <input 
      css={inputTag}
      ref={refParam => imgInput=refParam}
      type="file" 
      accept='image/*'
      name="file"
      onChange={onImgChange}
       />
      <button
      css={inputBtn}
      onClick={()=>imgInput.click()}
      > Upload </button>
    </div>
  )
}