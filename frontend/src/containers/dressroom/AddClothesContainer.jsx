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
} from '../../slices/clothesSlice';

export default function AddClothesContainer() {
  const dispatch = useDispatch();
  const modal = useSelector(state => state.modalSlice);
  const { isModalOpen, isResOpen, resText } = modal;

  const laundry = useSelector(state => state.laundrySlice);
  const { selectedIcon } = laundry;

  const clothes = useSelector(state => state.clothesSlice);
  const { imgURL, tagInfo, tagGroup } = clothes;

  const imgInput = useRef(null);
  const [loading, setLoading] = useState(null);

  const config = {
    Headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  function handleModal(value) {
    dispatch(changeisModalOpen(value));
  }

  function handleLaundry(value) {
    dispatch(changelaundryOpen(value));
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
      })
      .catch((err) => {
        console.log(err);
      });
    axios.post(`http://i6b108.p.ssafy.io:8000/clothing/tag`, formData, config)
      .then((res) => {
        const userName = 'admin';
        const data = res.data.data;
        dispatch(changeTagInfo({ data, userName }));
      });
  }

  function saveClothes() {
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
      .then((res) => {
        dispatch(changeResText(res.data.message));
        dispatch(changeisResOpen(true));
        handleresetClothes();
      })
      .catch((err) => {
        dispatch(changeResText(err.data.data.message));
        dispatch(changeisResOpen(true));
      });
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
      />
    </div>
  );
}
