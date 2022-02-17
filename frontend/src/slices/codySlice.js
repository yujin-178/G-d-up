import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadCodyByUserName, createFile, postCody, putCody } from '../services/api';
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
  'isdetailOpen': false,
  'selectedCody': '',
  'transitionEnd': false,
  'iscodyEdit': false,
  'tagFilter': [],
  'filterCody': [],
  'updateloading':false,
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

export const updatedCody = createAsyncThunk(
  'cody/updateCody',
  async (codyInfo) => {
    const response = await putCody( codyInfo );
    console.log(response);
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
      return {
        ...state,
        cards,
      };
    },
    setisdetailOpen(state, action) {
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
    setTagFilter(state, action) {
      if (action.payload.type === 'add') {
        const tag = action.payload.value;
        const { tagFilter } = state;
        return {
          ...state,
          tagFilter: [
            ...tagFilter,
            tag
          ]
        };
      } else if (action.payload.type === 'del') {
        state.tagFilter = action.payload.value;
      }
    },
    setFilterCody(state) {
      if (state.tagFilter.length >= 1) {
        const filter = state.codyList.filter(cody => {
          for (let i = 0; i < state.tagFilter.length; i++) {
            if (cody.hashList.includes(`${state.tagFilter[i]}`)) {
              return true;
            }
          }
        });
        state.filterCody = filter;
      } else {
        state.filterCody = state.codyList;
      }
    },
    changeFilterCody(state, action) {
      state.filterCody = action.payload;
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
    [updatedCody.pending]: (state) => {
      state.updateloading = true;
    },
    [updatedCody.fulfilled]: (state) => {
      state.updateloading = false;
    },
    [updatedCody.rejected]: (state, action) => {
      state.updateloading = false;
      console.log(action);
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
  setTagFilter,
  setFilterCody,
  changeFilterCody,
} = codySlice.actions;

export default codySlice.reducer;
