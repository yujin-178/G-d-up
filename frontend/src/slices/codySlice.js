import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadCodyByUserName } from '../services/api';

const initialState = {
  'offsetRadius' : 2,
  'showArrows' : false,
  'goToSlide' : null,
  'codyList' : [],
  'codyLoading' : false,
};

export const setCody = createAsyncThunk(
  'setCody',
  async (userName) => {
    const cody  = await loadCodyByUserName(userName);
    return cody;
  }
);

export const codySlice = createSlice({
  name: 'cody',
  initialState,
  reducers: {
    setgoToSlide(state,action) {
      const goToSlide = action.payload;
      return {
        ...state,
        goToSlide
      };
    },
  },
  extraReducers: {
    [setCody.pending.type] : (state) => {
      state.codyLoading = true;
    },
    [setCody.fulfilled.type] : (state,action) => {
      state.codyLoading = false;
      state.codyList = action.payload.map((item) => {
        return item.imageModel.imageUrl;
      });
    },
    [setCody.rejected.type] : (state, action) => {
      state.codyLoading = true;
      console.log(action);
    }
  }
});

export const {
  setgoToSlide,
} = codySlice.actions;

export default codySlice.reducer;
