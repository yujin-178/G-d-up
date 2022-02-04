import React from 'react';
import { css, jsx } from '@emotion/react';

export default function AddClothesPage({onImgChange, preview, imgInput}) {

    const Container = css`
        display: grid;
        grid-gap : 10px;
    `

    const imgContainer = css`
        grid-column: 2;
        display: block;
        margin-top: 5rem;
        border: 1px solid black;
        width: 400px;
        height: 300px;
        
        position: relative;
    `

    const previewImg = css`
        position: absolute;
        max-width: 90%; 
        max-height: 90%;
        width: auto;
        height: auto;
        margin : auto;
        top:0; bottom:0; left:0; right:0;
    `
    const btnContainer = css`
        grid-column: 2;
        width: 400px;
        text-align: center;
    `
    const inputTag = css`
        display : none;
    `
    const inputBtn = css`
        
        background: #faf6f3;

        margin: 0;
        padding: 0.5rem 1rem;

        font-family: "Noto Sans KR", sans-serif;
        font-size: 1rem;
        font-weight: 300;
        text-align: center;
        text-decoration: none;

        display: inline;
        width: 8rem;

        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        cursor: pointer;

        transition: 0.5s;

        border: none;
        border-radius: 4px;

        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    `




  return (
    <div css={Container}>
      <h5>옷 추가</h5>
      <div css={imgContainer}>
        <img 
        src={preview} 
        css={previewImg}/>
      </div>

      <div css={btnContainer}>
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
      > 업로드 </button>
      </div>
    </div>
  )
}