import React, { useState, useRef } from 'react';
import AddClothes from '../../components/dressroom/AddClothes';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import {
  changeisModalOpen,
} from '../../slices/modalSlice';

import {
  changelaundryOpen,
} from '../../slices/laundrySlice';

export default function AddClothesContainer() {
  const dispatch = useDispatch();
  const modal = useSelector(state => state.modalSlice);
  const { isModalOpen } = modal;

  const laundry = useSelector(state => state.laundrySlice);
  const { selectedIcon } = laundry;

  const [fileUrl, setFileUrl] = useState(null);
  const imgInput = useRef(null);

  function onImgChange(event) {
    const imgFile = event.target.files[0];
    const imgURL = URL.createObjectURL(imgFile);
    setFileUrl(imgURL);

    const formData = new FormData();
    formData.append('imageFile', event.target.files[0]);
    const config = {
      Headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(``, formData, config)
      .then(() => {
        URL.revokeObjectURL(fileUrl);
        setFileUrl("");

      });
  }

  function handleModal(value) {
    dispatch(changeisModalOpen(value));
  }

  function handleLaundry(value) {
    dispatch(changelaundryOpen(value));
  }

  return (
    <div>
      <AddClothes
        onImgChange={onImgChange}
        preview={fileUrl}
        imgInput={imgInput}
        modalToggle={handleModal}
        isModalOpen={isModalOpen}
        handleLaundry={handleLaundry}
        selectedLaundry={selectedIcon}
      />
    </div>
  );
}
