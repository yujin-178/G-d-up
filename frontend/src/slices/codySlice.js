import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadCodyByUserName } from '../services/api';
import { animateScroll as scroll } from 'react-scroll';

const initialState = {
  'offsetRadius': 3,
  'showArrows': false,
  'goToSlide': null,
  'codyList': [],
  'codyLoading': false,
  'scrollisTop': true,
  'cards': [],
  'renderCount': 0,
  'isdetailOpen': false,
  'selectedCody' : ''
};

export const setCody = createAsyncThunk(
  'setCody',
  async (userName) => {
    const cody = await loadCodyByUserName(userName);
    return cody;
  }
);

export const codySlice = createSlice({
  name: 'cody',
  initialState,
  reducers: {
    setgoToSlide(state, action) {
      const goToSlide = action.payload;
      if (state.goToSlide === goToSlide) {
        state.isdetailOpen = true;
        state.selectedCody = state.codyList[goToSlide];
      } else {
        state.goToSlide = goToSlide;
      }
    },
    setMoveScroll(state, action) {
      const type = action.payload;
      let scrollisTop = '';
      if (type === 'u') {
        scroll.scrollToTop();
        scrollisTop = true;
      } else if (type === 'd') {
        scroll.scrollToBottom();
        scrollisTop = false;
      }
      return {
        ...state,
        scrollisTop
      };
    },
    setCards(state, action) {
      const cards = action.payload;
      const { renderCount } = state;
      return {
        ...state,
        cards,
        renderCount : renderCount+1
      };
    },
    setisdetailOpen(state, action){
      const isdetailOpen = action.payload;
      return {
        ...state,
        isdetailOpen
      };
    },
    setDetail(state, action) {
      const currentDetail = action.payload;
      return {
        ...state,
        currentDetail
      };
    },
    changeSelectCody(state, action) {
      const index = action.payload;
      state.selectedCody = state.codyList[index];
    }
  },
  extraReducers: {
    [setCody.pending.type]: (state) => {
      state.codyLoading = true;
    },
    [setCody.fulfilled.type]: (state, action) => {
      state.codyLoading = false;
      state.codyList = action.payload.map((item) => {
        return item;
      });
    },
    [setCody.rejected.type]: (state, action) => {
      state.codyLoading = false;
      console.log(action);
    }
  }
});

export const {
  setgoToSlide,
  setMoveScroll,
  setCards,
  setisdetailOpen,
  setDetail,
  changeSelectCody,
} = codySlice.actions;

export default codySlice.reducer;
