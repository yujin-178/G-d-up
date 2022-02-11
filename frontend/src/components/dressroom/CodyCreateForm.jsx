import React from 'react';
import { css } from '@emotion/react';
import { useRef } from 'react';
import CodyItem from './CodyItem';
import html2canvas from 'html2canvas';
import axios from 'axios';

export default function CodyCreateForm({ codyItems, handleOnStart, handleOnStop }) {
  const canvasRef = useRef();

  const screenshot = async (element) => {
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/jpg");
    const response = await axios.get(data, { responseType: "blob" });
    const blob = response.data;
    const fd = new FormData();
    const file = new File([blob], "filename.jpeg");
    fd.append('imageFile', file);

    const itemsIncody = codyItems.map(item => {
      const { clothingId, position } = item;
      return {
        clothingId,
        x: position.x,
        y: position.y,
        z: position.z,
        m: position.m,
      };
    });

    const temp_data = {
      userName: 'jisoon',
      codyName: 'name',
      content: 'content',
      secret: 0,
      clothingList: itemsIncody,
      codyTag: '',
    };

    fd.append('createCody', new Blob([JSON.stringify(temp_data)], { type: 'application/json' }));

    const config = {
      Headers: { 'Content-Type': 'multipart/form-data' },
    };

    axios.post('http://i6b108.p.ssafy.io:8000/cody/create', fd, config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form>
      <button onClick={(e) => {
        e.preventDefault();
        screenshot(canvasRef.current);
      }}>test</button>
      <div
        id="canvas"
        css={canvas}
        ref={canvasRef}
      >
        {codyItems.map((item, index) => {
          return (
            <CodyItem
              key={index}
              item={item}
              handleOnStart={handleOnStart}
              handleOnStop={handleOnStop}
            />
          );
        })}
      </div>
      <input
        css={tagInput}
        type="text"
        placeholder="제목 입력"
      />
      <textarea
        css={memo}
        name="memo"
        placeholder="내용 입력"
      />
      <input type="text" css={searchInputStyle} />
      <button>리셋</button>
      <button>저장</button>
    </form>
  );
}

const tagInput = css`
  outline: none;
  display: block;
`;

const memo = css`
  display: block;
  overflow: hidden;
  resize:none;
  outline: none;
`;

const searchInputStyle = css`
  display: block;
  height: 35px;
  outline: 0;
  border: 0;
  border-radius: 5px;
  border-bottom: 2px solid silver;
  font-size: 19px;
`;

const canvas = css`
  min-width: 400px;
  max-width: 400px;
  min-height: 400px;
  background-color: beige;
  position: relative;
  border: 1px solid grey;
`;
