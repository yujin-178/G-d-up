import React, { useEffect, useRef, useState } from 'react';
import CodyDetailModal from '../../components/dressroom/CodyDetailModal';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import {
  setisdetailOpen,
  changeCodyEdit,
  updatedCody,
} from '../../slices/codySlice';

import {
  changeisResOpen,
  changeResText
} from '../../slices/modalSlice';

export default function CodyDetailContainer({ isLoggedInUser }) {
  const dispatch = useDispatch();
  const cody = useSelector(state => state.codySlice);
  const { iscodyEdit, selectedCody, isdetailOpen } = cody;

  const modal = useSelector(state => state.modalSlice);
  const { isResOpen, resText } = modal;

  const inputRef = useRef();
  const contentRef = useRef();
  const [tagList, setTagList] = useState(selectedCody.hashList);
  const [toggle, setToggle] = useState(selectedCody.secret);

  function editCancel() {
    setTagList(selectedCody.hashList);
    setToggle(selectedCody.secret);
  }
  useEffect(()=>{
    setTagList(selectedCody.hashList);
    setToggle(selectedCody.secret);
  }, [selectedCody]);

  function handleCodyDetailOpen(value) {
    dispatch(setisdetailOpen(value));
  }

  function handleCodyEdit(value) {
    dispatch(changeCodyEdit(value));
  }

  function handleResponse(value) {
    dispatch(changeisResOpen(value));
    dispatch(setisdetailOpen(value));
  }

  function deleteByCodyId(codyId) {
    dispatch(changeisResOpen(true));
    axios.delete(`http://i6b108.p.ssafy.io:8000/cody/delete/${codyId}`)
      .then(() => {
        dispatch(changeResText('삭제가 완료되었습니다!'));
      })
      .catch((err) => {
        dispatch(changeResText(err.data.message));
      });
  }

  const onKeyPress = event => {
    if (event.key === 'Enter') {
      const value = inputRef.current.value;
      if (tagList.includes(value)) {
        inputRef.current.value = '';
        return alert('이미 작성된 태그입니다');
      }
      if (value) {
        setTagList([...tagList, value]);
        inputRef.current.value = '';
      } else {
        return alert('내용을 입력해주세요');
      }
    }
  };

  const deleteTagHandler = value => {
    const deleted = tagList.filter(tag => tag !== value);
    setTagList(deleted);
  };

  function handleToggle() {
    if (toggle === 0) {
      setToggle(1);
    } else {
      setToggle(0);
    }
  }

  const updateCody = async () => {
    const content = contentRef.current.value;
    const clothingList = selectedCody.codyClothingEntities;
    const { codyId, codyName, userName, imageModel } = selectedCody;
    const secret = toggle;
    const codyTag = tagList.join(' ');
    const imageId = imageModel.imageId;
    dispatch(updatedCody({ imageId, content, clothingList, codyId, codyName, userName, secret, codyTag }));
    dispatch(changeisResOpen(true));
    dispatch(changeResText('수정이 완료되었습니다!'));
  };

  return (
    <div>
      <CodyDetailModal
        isdetailOpen={isdetailOpen}
        handleCodyDetailOpen={handleCodyDetailOpen}
        selectedCody={selectedCody}
        handleCodyEdit={handleCodyEdit}
        iscodyEdit={iscodyEdit}
        deleteCody={deleteByCodyId}
        isResOpen={isResOpen}
        resText={resText}
        handleResponse={handleResponse}
        isLoggedInUser={isLoggedInUser}
        onKeyPress={onKeyPress}
        inputRef={inputRef}
        contentRef={contentRef}
        tagList={tagList}
        deleteTagHandler={deleteTagHandler}
        handleToggle={handleToggle}
        toggle={toggle}
        editCancel={editCancel}
        updateCody={updateCody}
      />
    </div>
  );
}
