import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CodyCreateForm from '../../components/dressroom/CodyCreateForm';
import { resetFilter } from '../../slices/filterSlice';
import FilterContainer from './FilterContainer';
import ClothesItemList from '../../components/dressroom/ClothesItemList';
import { setClothes } from '../../slices/clothesSlice';
import axios from 'axios';

export default function CodyContainer() {
  const { clothes } = useSelector(state => state.clothesSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [codyItems, setCodyItems] = useState([]);
  const [tags, setTags] = useState([]);
  const initialSizeNum = 160;
  const inputRef = useRef();
  const contentRef = useRef();
  const [isNotSecret, setIsNotSecret] = useState(true);

  useEffect(() => {
    dispatch(setClothes('jisoon'));
  }, []);

  const onClickHandler = async (target) => {
    const { clothingId } = target.clothing;

    if (codyItems.find(item => item.clothingId === clothingId)) {
      return;
    }

    const response = await axios.get(`http://i6b108.p.ssafy.io:8000/clothing/detail/base64/${clothingId}`);
    const { base64 } = response.data.data;

    const z_index = codyItems.length + 1;
    const initialPosition = { x: 0, y: 0, z: z_index };
    const initialSize = { width: initialSizeNum, height: initialSizeNum, m: 1 };

    setCodyItems(() => [...codyItems, {
      clothingId,
      image: base64,
      position: initialPosition,
      size: initialSize
    }]);
  };

  const handleOnStart = (activatedItem) => {
    const standard = activatedItem.position.z;

    if (codyItems.length === standard) {
      return;
    }

    setCodyItems(codyItems.map((item) => {
      const { z } = item.position;

      if (item.clothingId === activatedItem.clothingId) {
        return {
          ...item,
          position: {
            ...item.position,
            z: codyItems.length
          }
        };
      }

      if (z > standard) {
        return {
          ...item,
          position: {
            ...item.position,
            z: z - 1
          }
        };
      }

      return item;
    }));
  };

  const handleOnStop = (itemId, data) => {
    setCodyItems(codyItems.map(item => {
      if (item.clothingId === itemId) {
        return {
          ...item,
          position: {
            ...item.position,
            x: data.x,
            y: data.y,
          }
        };
      }

      return item;
    }));
  };

  const handleResizeStop = (itemId, ref, position) => {
    const newSize = ref.style.width.replace('px', '') * 1;
    const m = newSize / initialSizeNum;

    setCodyItems(codyItems.map(item => {
      if (item.clothingId === itemId) {
        return {
          ...item,
          position: {
            ...item.position,
            ...position,
          },
          size: {
            width: newSize,
            height: newSize,
            m
          }
        };
      }

      return item;
    }));
  };

  const onKeyPress = event => {
    event.preventDefault();

    if (event.key === 'Enter') {
      const value = inputRef.current.value;

      if (tags.includes(value)) {
        inputRef.current.value = '';
        return alert('이미 작성된 태그입니다.');
      }

      if (value) {
        setTags([...tags, value]);
        inputRef.current.value = '';
      } else {
        return alert('내용을 입력해주세요');
      }
    }

  };

  const deleteTagHandler = value => {
    const deleted = tags.filter(tag => tag !== value);
    setTags(deleted);
  };

  const toggleIsNotSecret = () => {
    setIsNotSecret(!isNotSecret);
  };

  return (
    <>
      <h1>CodyContainer</h1>
      <button onClick={() => {
        dispatch(resetFilter());
        navigate('/dressroom');
      }}>
        드레스룸으로 돌아가기
      </button>
      <FilterContainer />
      <ClothesItemList
        clothes={clothes}
        onClickHandler={onClickHandler}
      />
      <CodyCreateForm
        clothes={clothes}
        codyItems={codyItems}
        handleOnStart={handleOnStart}
        handleOnStop={handleOnStop}
        handleResizeStop={handleResizeStop}
        inputRef={inputRef}
        tags={tags}
        onKeyPress={onKeyPress}
        deleteTagHandler={deleteTagHandler}
        contentRef={contentRef}
        isNotSecret={isNotSecret}
        toggleIsNotSecret={toggleIsNotSecret}
      />
    </>
  );
}
