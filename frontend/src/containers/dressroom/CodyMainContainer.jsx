import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import { v4 as uuidv4 } from 'uuid';

import CodyPage from '../../components/dressroom/CodyPage';
import CodyCard from '../../components/dressroom/CodyCard';

import {
  setgoToSlide,
  setCody,
  setMoveScroll
} from '../../slices/codySlice';

export default function CodyContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCody('admin'));
  }, []);

  const cody = useSelector(state => state.codySlice);
  const { offsetRadius, showArrows, goToSlide, codyList, scrollisTop } = cody;

  function handlegoToSlide(value) {
    dispatch(setgoToSlide(value));
  }

  function handleMoveScroll(type) {
    dispatch(setMoveScroll(type));
  }

  const cardList = codyList.map((card) => {
    return {
      key: uuidv4(),
      content: (
        <CodyCard imgurl={card} />
      )
    };
  });

  const table = cardList.map((element, index) => {
    return {
      ...element,
      onClick: () => dispatch(setgoToSlide(index))
    };
  });

  const [cards] = useState(table);

  return (
    <div>
      <CodyPage
        navigate={navigate}
        cards={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showArrows={showArrows}
        handlegoToSlide={handlegoToSlide}
        moveScroll={handleMoveScroll}
        codyList={codyList}
        scrollisTop={scrollisTop}
      />
    </div>
  );
}
