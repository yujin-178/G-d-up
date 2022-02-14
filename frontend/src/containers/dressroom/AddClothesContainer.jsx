import React, { useRef, useState } from 'react';
import AddClothes from '../../components/dressroom/AddClothes';
import axios from 'axios';
import Resizer from "react-image-file-resizer";
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

  const config = {
    Headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const userName = 'jisoon';

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        400,
        "JPEG",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

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
    const image = resizeFile(event.target.files[0]);
    formData.append('imageFile', image);

    axios.post(`http://i6b108.p.ssafy.io:8000/clothing/background`, formData, config)
      .then((res) => {
        dispatch(setImgURL(res.data.data));
        setLoading(false);
        document.getElementById('saveBtn').disabled = false;
      })
      .catch((err) => {
        const message = err.message;
        setLoading(false);
        handleimgError({ type: 'background', text : message });
      });
    axios.post(`http://i6b108.p.ssafy.io:8000/clothing/tag`, formData, config)
      .then((res) => {
        const data = res.data.data;
        dispatch(changeTagInfo({ data, userName }));
        document.getElementById('saveBtn').disabled = false;
      })
      .catch((err) => {
        const message = err.message;
        handleimgError({ type: 'tag', text : message });
      });
  }

  function saveClothes() {
    dispatch(changeisResOpen(true));
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
      .then((res) => {
        handleresloading(false);
        dispatch(changeResText(res.data.message));
        handleresetClothes();
        dispatch(setClothes(userName));
      })
      .catch((err) => {
        handleresloading(false);
        dispatch(changeResText(err.data.data.message));
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
        resloading={resloading}
        imgError={imgError}
      />
    </div>
  );
}
