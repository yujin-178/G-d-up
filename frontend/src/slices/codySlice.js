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
    await postCody({ ...codyInfo, file });
    return codyInfo;
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
      if (type === 'u'){
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
    closeModal(state) {
      state.modalType = null;
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
    },

    [createCody.pending]: (state) => {
      state.loading = true;
    },
    [createCody.fulfilled]: (state, { payload }) => {
      state.loading = false;
      // 백엔드에서 완성하면 추가 예정
      //state.codyList = [...state.codyList, payload];
      state.modalType = 'POST';
    },
    [createCody.rejected]: (state) => {
      state.loading = false;
    }
  }
});

export const {
  setgoToSlide,
  setMoveScroll,
  closeModal,
} = codySlice.actions;

export default codySlice.reducer;
