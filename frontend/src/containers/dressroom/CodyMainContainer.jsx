import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
// import { animateScroll as scroll } from 'react-scroll';
// import { v4 as uuidv4 } from 'uuid';
import CodyPage from '../../components/dressroom/CodyPage';
import CodyCard from '../../components/dressroom/CodyCard';

import {
  setgoToSlide,
  setCody,
  setMoveScroll,
  setCards,
  changeSelectCody
} from '../../slices/codySlice';

export default function CodyContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cody = useSelector(state => state.codySlice);
  const { renderCount, offsetRadius, showArrows, goToSlide, codyList, scrollisTop, cards, codyLoading } = cody;

  const [scrollPosition, setScrollPosition] = useState(0);
  function updateScroll() {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  }
  useEffect(() => {
    dispatch(setCody('admin'));
  }, []);

  let codyCard = setTimeout(() => {
    if (codyLoading === false ) {
      const cardList = codyList.map((card) => {
        return {
          key: card.codyId,
          content: (
            <CodyCard imgurl={card.imageModel.imageUrl} />
          )
        };
      });
      const cards = cardList.map((element, index) => {
        return {
          ...element,
          onClick: () => dispatch(setgoToSlide(index))
        };
      });
      dispatch(setCards(cards));   
    }
  }, 1000);

  if (renderCount > 1) {
    clearTimeout(codyCard);
  }
 
  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', updateScroll);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  }, [scrollPosition]);

  if (scrollPosition === 200 && scrollisTop === true) {
    handleMoveScroll('d');
  } else if (scrollPosition === 800 && scrollisTop === false) {
    handleMoveScroll('u');
  }

  function handlegoToSlide(value) {
    dispatch(setgoToSlide(value));
  }

  function handleMoveScroll(type) {
    dispatch(setMoveScroll(type));
  }

  function handleSelectCody(value) {
    dispatch(changeSelectCody(value));
  }

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
        handleSelectCody={handleSelectCody}
      />
    </div>
  );
}
