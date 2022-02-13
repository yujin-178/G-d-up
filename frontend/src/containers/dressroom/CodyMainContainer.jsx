import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
// import { animateScroll as scroll } from 'react-scroll';
import { v4 as uuidv4 } from 'uuid';
import CodyPage from '../../components/dressroom/CodyPage';
import CodyCard from '../../components/dressroom/CodyCard';

import {
  setgoToSlide,
  setCody,
  setMoveScroll,
  setCards,
} from '../../slices/codySlice';

export default function CodyContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cody = useSelector(state => state.codySlice);
  const { count, offsetRadius, showArrows, goToSlide, codyList, scrollisTop, cards, codyLoading } = cody;

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
          key: uuidv4(),
          content: (
            <CodyCard imgurl={card} />
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

  if (count > 1) {
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
