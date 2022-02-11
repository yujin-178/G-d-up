import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    dispatch(setClothes('jisoon'));
  }, []);

  const onClickHandler = async(target) => {
    const { clothingId } = target.clothing;

    if (codyItems.find(item => item.clothingId === clothingId)) {
      return;
    }

    const response = await axios.get(`http://i6b108.p.ssafy.io:8888/clothing/test/detail/${clothingId}`);
    const { base64 } = response.data.data;

    const z_index = codyItems.length + 1;
    const initalPosition = { x: 0, y: 0, z: z_index };

    setCodyItems(() => [...codyItems, {
      clothingId,
      image: base64,
      position: initalPosition,
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
            x: data.x,
            y: data.y,
            z: item.position.z,
            m: 1,
          }
        };
      }

      return item;
    }));
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
      />
    </>
  );
}
