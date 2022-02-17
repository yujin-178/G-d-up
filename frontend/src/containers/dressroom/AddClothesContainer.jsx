import React, { useRef, useState } from 'react';
import AddClothes from '../../components/dressroom/AddClothes';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { season } from '../../constants/filter';

import {
  changeisModalOpen,
  changeisResOpen,
  changeResText
} from '../../slices/modalSlice';

import {
  changelaundryOpen,
  resetlaundry,
} from '../../slices/laundrySlice';

import {
  changeTagInfo,
  setImgURL,
  selectSeason,
  resetClothes,
  changeresloading,
  setClothes,
  changeimgError,
  setTagGroup,
} from '../../slices/clothesSlice';

export default function AddClothesContainer() {
  const dispatch = useDispatch();
  const modal = useSelector(state => state.modalSlice);
  const { isModalOpen, isResOpen, resText } = modal;

  const laundry = useSelector(state => state.laundrySlice);
  const { selectedIcon } = laundry;

  const clothes = useSelector(state => state.clothesSlice);
  const { imgURL, tagInfo, tagGroup, resloading, imgError } = clothes;

  const imgInput = useRef(null);
  const [loading, setLoading] = useState(null);

  const inputRef = useRef();
  const [isTagOpen, setisTagOpen] = useState(false);

  const onKeyPress = event => {
    if (event.key === 'Enter'){
      const value = inputRef.current.value;
      if (tagGroup.includes(value)) {
        inputRef.current.value = '';
        return alert('이미 작성된 태그입니다');
      }
      if (value) {
        dispatch(setTagGroup([...tagGroup, value]));
        inputRef.current.value = '';
      } else {
        return alert('내용을 입력해주세요');
      }
    }
  };

  const deleteTagHandler = value => {
    const deleted = tagGroup.filter(tag => tag !== value);
    dispatch(setTagGroup(deleted));
  };

  const config = {
    Headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const { userName } = useSelector(state => state.authSlice);

  function handleimgError({ type, text }) {
    dispatch(changeimgError({ type, text }));
  }

  function handleModal(value) {
    dispatch(changeisModalOpen(value));
  }

  function handleLaundry(value) {
    dispatch(changelaundryOpen(value));
  }

  function handleresloading(value) {
    dispatch(changeresloading(value));
  }

  function handleresetClothes() {
    dispatch(resetClothes());
    dispatch(resetlaundry());
  }

  function handleSeason(value) {
    dispatch(selectSeason(value));
  }

  function handleResponse(value) {
    dispatch(changeisResOpen(value));
    dispatch(changeisModalOpen(value));
  }

  function onImgChange(event) {
    setLoading(true);
    const formData = new FormData();
    formData.append('imageFile', event.target.files[0]);

    axios.post(`http://i6b108.p.ssafy.io:8000/clothing/background`, formData, config)
      .then((res) => {
        dispatch(setImgURL(res.data.data));
        setLoading(false);
        document.getElementById('saveBtn').disabled = false;
      })
      .catch((err) => {
        const message = err.message;
        setLoading(false);
        handleimgError({ type: 'background', text: message });
      });
    axios.post(`http://i6b108.p.ssafy.io:8000/clothing/tag`, formData, config)
      .then((res) => {
        const data = res.data.data;
        dispatch(changeTagInfo({ data, userName }));
        document.getElementById('saveBtn').disabled = false;
      })
      .catch((err) => {
        const message = err.message;
        handleimgError({ type: 'tag', text: message });
      });
  }

  function saveClothes() {
    dispatch(changeisResOpen(true));
    if (tagInfo && imgURL) {
      handleresloading(true);
      const config = {
        Headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const formData = new FormData();
      formData.append('imageFile', imgURL);
      formData.append('clothing', new Blob([JSON.stringify(tagInfo)], { type: 'application/json' }));
      formData.append('hashtag', tagGroup.join(' '));
      formData.append('washing', selectedIcon.join(' '));

      axios.post(`http://i6b108.p.ssafy.io:8000/clothing/save`, formData, config)
        .then(() => {
          handleresloading(false);
          dispatch(changeResText('성공적으로 저장되었습니다.'));
          handleresetClothes();
          dispatch(setClothes(userName));
        })
        .catch(() => {
          handleresloading(false);
          dispatch(changeResText('오류가 발생했습니다. 다시 시도해주세요.'));
        });
    } else {
      dispatch(changeResText('내용을 입력해주세요.'));
    }
  }

  function importAll(r) {
    let images = {};
    r.keys().map((item) => {
      images[(item.replace('./', '')).replace('.png', '')] = r(item).default;
    });
    return images;
  }
  const r = require.context('../../../public/laundry/', false, /\.(png|jpe?g|svg)$/);
  const images = importAll(r);

  return (
    <div>
      <AddClothes
        onImgChange={onImgChange}
        preview={imgURL}
        imgInput={imgInput}
        modalToggle={handleModal}
        isModalOpen={isModalOpen}
        handleLaundry={handleLaundry}
        selectedLaundry={selectedIcon}
        tagInfo={tagInfo}
        allSeason={season}
        tagGroup={tagGroup}
        selectSeason={handleSeason}
        saveClothes={saveClothes}
        handleResponse={handleResponse}
        isResOpen={isResOpen}
        resText={resText}
        images={images}
        loading={loading}
        resetClothes={handleresetClothes}
        resloading={resloading}
        imgError={imgError}
        inputRef={inputRef}
        onKeyPress={onKeyPress}
        isTagOpen={isTagOpen}
        setisTagOpen={setisTagOpen}
        deleteTagHandler={deleteTagHandler}
      />
    </div>
  );
}
