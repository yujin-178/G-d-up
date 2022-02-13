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
  'count': 0,
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
      return {
        ...state,
        goToSlide
      };
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
      const { count } = state;
      return {
        ...state,
        cards,
        count : count+1
      };
    }
  },
  extraReducers: {
    [setCody.pending.type]: (state) => {
      state.codyLoading = true;
    },
    [setCody.fulfilled.type]: (state, action) => {
      state.codyLoading = false;
      state.codyList = action.payload.map((item) => {
        return item.imageModel.imageUrl;
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
} = codySlice.actions;

export default codySlice.reducer;
