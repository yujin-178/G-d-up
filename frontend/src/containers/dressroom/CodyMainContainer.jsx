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
  changeFilterCody,
} from '../../slices/codySlice';
import { sessionLogin } from '../../slices/authSlice';
import { setUserName } from '../../slices/clothesSlice';

export default function CodyMainContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tagRef = useRef();

  const cody = useSelector(state => state.codySlice);
  const { filterCody, tagFilter, selectedCody, isdetailOpen, offsetRadius, showArrows, goToSlide, codyList, scrollisTop, cards, codyLoading } = cody;
  // const [scrollPosition, setScrollPosition] = useState(0);
  // function updateScroll() {
  //   setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  // }

  // if (document.getElementById('Fadeup')){
  //   document.getElementById('Fadeup').ontransitionend = () => {
  //     dispatch(setEnd(true));
  //   };
  // }
  const loggedInUser = useSelector(state => state.authSlice.userName);
  const { userName } = useSelector(state => state.clothesSlice);

  useEffect(() => {
    if (userName === '익명' && localStorage.getItem('friendName')) {
      const userName = localStorage.getItem('friendName');
      dispatch(setUserName(userName));
      dispatch(setCody(userName));
    } else if (userName !== '익명') {
      dispatch(setCody(userName));
    } else if (loggedInUser) {
      if (userName === '익명'){
        dispatch(setUserName(loggedInUser));
      } 
      dispatch(setCody(loggedInUser));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      const loggedInUser = JSON.parse(localStorage.getItem('userInfo')).username;
      dispatch(sessionLogin(loggedInUser));
    } else {
      navigate('/login');
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (tagFilter.length >= 1) {
      dispatch(setFilterCody());
    } else {
      dispatch(changeFilterCody(codyList));
    }
  }, [tagFilter, codyList]);

  useEffect(() => {
    if (codyLoading === false) {
      if (codyList) {
        dispatch(changeFilterCody(codyList));
        const cardList = codyList.map((card) => {
          return {
            key: card.codyId,
            content: (
              <CodyCard imgurl={card.imageModel.imageUrl} card={card} />
            )
          };
        });
        const cards = cardList.map((element, index) => {
          return {
            ...element,
            onClick: () => dispatch(setgoToSlide(index)),
          };
        });
        dispatch(setCards(cards));
      } else {
        const cards = [];
        dispatch(setCards(cards));
      }
      // if (localStorage.getItem('friendName') !== JSON.parse(localStorage.getItem('userInfo')).username){
      //   setopenCard(cards.filter(card=>card.content.props.card.secret === 0));
      // }
    }
  }, [codyList]);

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
        userName={userName}
        isLoggedInUser={loggedInUser === userName}
      />
    </div>
  );
}
