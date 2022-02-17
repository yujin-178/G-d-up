import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CodyCreateForm from '../../components/dressroom/CodyCreateForm';
import { resetFilter } from '../../slices/filterSlice';
import FilterContainer from './FilterContainer';
import ClothesItemList from '../../components/dressroom/ClothesItemList';
import { setClothes } from '../../slices/clothesSlice';
import axios from 'axios';
import Modal from '../../components/dressroom/Modal';
import Messages from '../../components/dressroom/Messages';
import Button from '../../components/dressroom/Button';
import { createCody, closeModal } from '../../slices/codySlice';
import { css } from '@emotion/react';
import codyBackground from '../../../public/images/codybackground.jpg';

import { filteredClothesSelector } from '../../filterSelector';
import { sessionLogin } from '../../slices/authSlice';

export default function CodyContainer() {
  const { modalType } = useSelector(state => state.codySlice);
  const filteredClothes = useSelector(state => filteredClothesSelector(state));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [codyItems, setCodyItems] = useState([]);
  const [tags, setTags] = useState([]);
  const initialSizeNum = 160;
  const inputRef = useRef();
  const contentRef = useRef();
  const [isNotSecret, setIsNotSecret] = useState(true);
  const canvasRef = useRef();
  const [modalProps, setModalProps] = useState({});
  const [activatedItemId, setActivatedItemId] = useState(null);
  const { userName } = useSelector(state => state.authSlice);
  useEffect(() => {
    if (userName) {
      dispatch(setClothes(userName));
      return;
    }

    if (localStorage.getItem('userInfo')){
      const userName = JSON.parse(localStorage.getItem('userInfo')).username;
      dispatch(sessionLogin(userName));
    } else {
      navigate('/login');
    }
  }, [userName]);

  useEffect(() => {
    if (modalType === 'POST') {
      setModalProps({
        message: '내 코디가 저장되었습니다.',
        subMessage: '코디 목록으로 이동하시겠습니까?',
        okButtonTitle: '이동',
        cancelButtonTitle: '취소',
        onClickOk: () => {
          dispatch(closeModal());
          setModalProps({});
          navigate('/cody');
          location.reload();
        },
        onClickCancel: () => {
          dispatch(closeModal());
          setModalProps({});
          resetHandler();
        },
      });
      return;
    }
  }, [modalType]);

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
    if (activatedItem.clothingId !== activatedItemId) {
      setActivatedItemId(activatedItem.clothingId);
    }

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
    setActivatedItemId(null);
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
    setActivatedItemId(null);
  };

  const onKeyPress = event => {
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

  const saveHandler = async (event) => {
    event.preventDefault();
    const content = contentRef.current.value;
    const canvas = canvasRef.current;
    dispatch(createCody({ canvas, codyItems, content, isNotSecret, tags, userName }));
  };

  const goBackHandler = () => {
    dispatch(resetFilter());
    navigate('/cody');
    location.reload();
  };

  const deleteCodyItem = (itemId) => {
    setCodyItems(codyItems.filter(item => item.clothingId !== itemId));
  };

  const resetHandler = () => {
    setCodyItems([]);
    setTags([]);
    setIsNotSecret(true);
    contentRef.current.value = '';
  };

  return (
    <div css={container}>
      {modalType && (
        <Modal>
          <Messages message={modalProps.message} subMessage={modalProps.subMessage} />
          <Button title={modalProps.cancelButtonTitle} onClick={modalProps.onClickCancel} color='white' />
          <Button title={modalProps.okButtonTitle} onClick={modalProps.onClickOk} color='#1890FF' />
        </Modal>
      )}
      <CodyCreateForm
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
        saveHandler={saveHandler}
        canvasRef={canvasRef}
        goBackHandler={goBackHandler}
        activatedItemId={activatedItemId}
        deleteCodyItem={deleteCodyItem}
        resetHandler={resetHandler}
      />
      <div css={clothesContainer}>
        <FilterContainer />
        <ClothesItemList
          filteredClothes={filteredClothes}
          onClickHandler={onClickHandler}
        />
      </div>
      <button
        css={backButton}
        onClick={goBackHandler}
        className='hvr-fade'
      > Back </button>
    </div>
  );
}
const container = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vm;
  background-image: linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${codyBackground});
  background-size: cover;
  background-position: center;
`;

const clothesContainer = css`
  position: relative;
  width: 45%;
  max-width: 47rem;
  height: 80%;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 12% 88%;
  grid-auto-rows: minmax(100px, auto);
  grid-auto-columns: minmax(100px, auto);
  background-color: #BFAEA4;
`;

const backButton = css`
  position: absolute;
  right: 10rem;
  bottom: 35px;
  width: 90px;
  height: 40px;
  background-color: white;
  color: white;
  border: 1.5px solid white;
  background-color: #2E2E2E;
  cursor: pointer;
`;
