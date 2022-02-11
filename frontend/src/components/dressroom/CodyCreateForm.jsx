import React, { useState } from 'react';
import { css } from '@emotion/react';
import Draggable from 'react-draggable';
import { useRef } from 'react';

const image1 = "https://cafe24img.poxo.com/dcollec/web/product/medium/202112/db33dab5fd0f188c82fc6ded213370ba.jpg";
const image2 = "https://www.costco.co.kr/medias/sys_master/images/hc5/h8b/69613878444062.jpg";
const image3 = "http://rilly.co.kr/web/product/big/201801/6884_shop1_394512.jpg";

function Item({ item, nodeRef, trackPosition }) {
  const { id, image, position } = item;
  console.log(position);

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      onDrag={(e, data) => trackPosition(id, data)}
      defaultPosition={{ x: position.x, y: position.y }}
    >
      <div css={please({ image })}></div>
    </Draggable>
  );
}

export default function CodyCreateForm() {
  const [clothesInCody, setClothesInCody] = useState([]);
  const [activatedItem, setActivatedItem] = useState(null);
  const canvasRef = useRef();
  const nodeRef = useRef();
  const trackPosition = (itemId, data) => {
    console.log(itemId, data);
    setClothesInCody(clothesInCody.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          position: { x: data.x, y: data.y }
        };
      }

      return item;
    }));
  };

  const clickHandler = (imagePath) => {
    if (activatedItem !== imagePath) {
      setActivatedItem(imagePath);
    }

    if (!clothesInCody.includes(imagePath)) {
      const firstPosition = { x: 0, y: 0 };

      setClothesInCody(() => [...clothesInCody, {
        id: Date.now(),
        image: imagePath,
        position: firstPosition,
      }]);
    }
  };

  return (
    <form>
      <div css={tempCody}>
        <div
          id="canvas"
          css={canvas}
          ref={canvasRef}
        >
          {clothesInCody.map((item, index) => {
            return (
              <Item
                key={index}
                item={item}
                nodeRef={nodeRef}
                trackPosition={trackPosition}
              />
            );
          })}
        </div>
        <img
          css={image}
          src={image1}
          onClick={() => clickHandler(image1)}
          alt=""
        />
        <img
          css={image}
          src={image2}
          onClick={() => clickHandler(image2)}
          alt="" />
        <img
          css={image}
          src={image3}
          onClick={() => clickHandler(image3)}
          alt="" />
      </div>
      <input
        css={tagInput}
        type="text"
        placeholder="태그 입력"
      />
      <textarea
        css={memo}
        name="memo"
        placeholder="메모 입력"
      />
      <input type="text" css={searchInputStyle} />
      <button>리셋</button>
      <button>
        저장
      </button>
    </form>
  );
}

const tagInput = css`
  outline: none;
  display: block;
`;

const memo = css`
  display: block;
  overflow:hidden;
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

const image = css`
  height: 150px;
  width: 150px;
`;

const canvas = css`
  min-width: 400px;
  max-width: 400px;
  min-height: 400px;
  background-color: #6698FF;
  position: relative;
`;

const tempCody = css`
  display: flex;
`;

const please = ({ image }) => css`
  background-color: transparent;
  background-position: center center;
  position: absolute;
  width: 150px;
  height: 150px;
  background-image: url(${image});
  background-size: contain;
  background-repeat: no-repeat;
`;
