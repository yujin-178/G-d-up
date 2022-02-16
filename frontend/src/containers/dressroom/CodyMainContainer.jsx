import React, { useEffect, useRef } from 'react';
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
  changeSelectCody,
  setisdetailOpen,
  setTagFilter,
  setFilterCody,
  changeFilterCody
} from '../../slices/codySlice';
import { sessionLogin } from '../../slices/authSlice';

export default function CodyMainContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tagRef = useRef();

  const cody = useSelector(state => state.codySlice);
  const { filterCody ,tagFilter, selectedCody, isdetailOpen, renderCount, offsetRadius, showArrows, goToSlide, codyList, scrollisTop, cards, codyLoading } = cody;
  // const [scrollPosition, setScrollPosition] = useState(0);
  // function updateScroll() {
  //   setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  // }

  // if (document.getElementById('Fadeup')){
  //   document.getElementById('Fadeup').ontransitionend = () => {
  //     dispatch(setEnd(true));
  //   };
  // }
  const { userName } = useSelector(state => state.authSlice);

  useEffect(() => {
    if (userName) {
      dispatch(setCody(userName));
      return;
    }

    if (localStorage.getItem('userInfo')){
      const userName = JSON.parse(localStorage.getItem('userInfo')).username;
      dispatch(sessionLogin(userName));
    } else {
      navigate('/login');
    }
  }, [userName]);

  useEffect(()=> {
    if (tagFilter.length >= 1) {
      dispatch(setFilterCody());
    } else {
      dispatch(changeFilterCody(codyList));
    }
  }, [tagFilter, codyList]);

  let codyCard = setTimeout(() => {
    if (codyLoading === false) {
      if (codyList) {
        dispatch(changeFilterCody(codyList));
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
      } else {
        const cards = [];
        dispatch(setCards(cards));
      }
    }
  }, 1000);

  if (renderCount > 1) {
    clearTimeout(codyCard);
  }

  // useEffect(() => {
  //   const watch = () => {
  //     window.addEventListener('scroll', updateScroll);
  //   };
  //   watch();
  // return () => {
  //   window.removeEventListener('scroll', updateScroll);
  // };
  // }, [scrollPosition]);

  function handlegoToSlide(value) {
    dispatch(setgoToSlide(value));
  }

  function handleMoveScroll(type) {
    dispatch(setMoveScroll(type));
  }

  function handleSelectCody(value) {
    dispatch(changeSelectCody(value));
  }

  function handleDetailOpen(value) {
    dispatch(setisdetailOpen(value));
  }

  // if (scrollPosition === 200 && scrollisTop === true) {
  //   handleMoveScroll('d');
  // }
  // else if (scrollPosition === 800 && scrollisTop === false) {
  //   handleMoveScroll('u');
  // }

  function onKeyPress(event) {
    if (event.key === 'Enter') {
      const value = tagRef.current.value;
      if (tagFilter.includes(value)) {
        tagRef.current.value = '';
        return alert('이미 작성된 태그입니다');
      }
      if (value) {
        dispatch(setTagFilter({ value: value, type: 'add' }));
        tagRef.current.value = '';
      } else {
        return alert('내용을 입력해주세요');
      }
    }
  }

  function tagDelete(value) {
    const newTags = tagFilter.filter(tag => tag !== value);
    dispatch(setTagFilter({ value: newTags, type: 'del' }));
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
        isdetailOpen={isdetailOpen}
        selectedCody={selectedCody}
        setisdetailOpen={handleDetailOpen}
        tagRef={tagRef}
        onKeyPress={onKeyPress}
        tagFilter={tagFilter}
        tagDelete={tagDelete}
        filterCody={filterCody}
      />
    </div>
  );
}
