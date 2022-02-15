import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadCodyByUserName, createFile, postCody } from '../services/api';
import { animateScroll as scroll } from 'react-scroll';

const initialState = {
  'offsetRadius': 3,
  'showArrows': false,
  'goToSlide': null,
  'codyList': [],
  'codyLoading': false,
  'scrollisTop': true,
  modalType: null,
  'cards': [],
  'renderCount': 0,
  'isdetailOpen': false,
  'selectedCody' : '',
  'transitionEnd' : false,
  'iscodyEdit' : false,
};

export const setCody = createAsyncThunk(
  'setCody',
  async (userName) => {
    const cody = await loadCodyByUserName(userName);
    return cody;
  }
);

export const createCody = createAsyncThunk(
  'cody/createCody',
  async (codyInfo) => {
    const { canvas } = codyInfo;
    const file = await createFile(canvas);
    const response = await postCody({ ...codyInfo, file });
    return response.data.data;
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
      if (type === 'u') {
        scroll.scrollToTop();
        state.scrollisTop = true;
      } else if (type === 'd') {
        scroll.scrollToBottom();
        state.scrollisTop = false;
      }
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
    },
    setEnd(state, action) {
      const transitionEnd = action.payload;
      return {
        ...state,
        transitionEnd
      };
    },
    closeModal(state) {
      state.modalType = null;
    },
    changeCodyEdit(state, action) {
      state.iscodyEdit = action.payload;
    },
  },
  extraReducers: {
    [setCody.pending.type]: (state) => {
      state.codyLoading = true;
    },
    [setCody.fulfilled.type]: (state, action) => {
      state.codyLoading = false;
      state.codyList = action.payload;
    },
    [setCody.rejected.type]: (state, action) => {
      state.codyLoading = false;
      console.log(action);
    },

    [createCody.pending]: (state) => {
      state.loading = true;
    },
    [createCody.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.codyList = [...state.codyList, payload];
      state.modalType = 'POST';
    },
    [createCody.rejected]: (state) => {
      state.loading = false;
    },
  }
});

export const {
  setgoToSlide,
  setMoveScroll,
  closeModal,
  setCards,
  setisdetailOpen,
  setDetail,
  changeSelectCody,
  setEnd,
  changeCodyEdit,
} = codySlice.actions;

export default codySlice.reducer;
