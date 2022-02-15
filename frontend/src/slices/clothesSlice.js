import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadClothesByUserName } from '../services/api';

const initialState = {
  clothes: [],
  selectedClothes: null,
  loading: false,
  error: null,
  tagInfo: { 'season': '' },
  imgURL: '',
  tagGroup: [],
};

export const deleteClothesById = createAsyncThunk(
  'clothes/deleteClothes',
  async (clothesId) => {
  // async (clothesId, thunkAPI) => {
    // todo: api request

    // const response = await axiosServer({
    //   method: 'delete',
    //   url: `clothes/${clothesId}/`,
    // });
    return clothesId;
  }
);

export const setClothes = createAsyncThunk(
  'clothes/setClothes',
  async (userName) => {
    // async (userName, thunkAPI) => {
    const clothes = await loadClothesByUserName(userName);
    return clothes;
  }
);

export const clothesSlice = createSlice({
  name: 'clothes',
  initialState,
  reducers: {
    selectClothes(state, action) {
      return {
        ...state,
        selectedClothes: action.payload,
      };
    },
    changeTagInfo(state, action) {
      const tags = action.payload.data;
      const tagList = [];
      for (let tag in tags) {
        if (tags[tag] !== null) {
          tagList.push(`#${tags[tag]}`);
        }
      }
      return {
        ...state,
        tagInfo: {
          ...tags,
          'userName': action.payload.userName
        },
        tagGroup: tagList,
      };
    },
    setImgURL(state, action) {
      return {
        ...state,
        imgURL: action.payload,
      };
    },
    selectSeason(state, action) {
      const { tagInfo } = state;
      return {
        ...state,
        tagInfo: {
          ...tagInfo,
          'season': action.payload
        }
      };
    }
  },
  extraReducers: {
    // [setClothes.pending]: (state, action) => {
    [setClothes.pending]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [setClothes.fulfilled]: (state, action) => {
      const clothes = action.payload ? action.payload : [];
      const selectedClothes = clothes.length ? clothes[0] : null;
      return {
        ...state,
        loading: false,
        clothes: clothes,
        selectedClothes: selectedClothes,
      };
    },
    // [setClothes.rejected]: (state, action) => {
    [setClothes.rejected]: (state) => {
      return {
        ...state,
        loading: false,
        error: '존재하지 않는 사용자입니다.'
      };
    },
    [deleteClothesById.pending]: (state) => {
    // [deleteClothesById.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      };
    },
    [deleteClothesById.fulfilled]: (state, { payload }) => {
      const deleted = state.clothes.filter(item => item.id !== payload);
      return {
        ...state,
        loading: false,
        clothes: deleted,
        selectedClothes: deleted[0],
      };
    },
    [deleteClothesById.rejected]: (state) => {
    // [deleteClothesById.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: '오류가 발생했습니다.'
      };
    },
  }
});

export const {
  selectClothes,
  changeTagInfo,
  setImgURL,
  selectSeason,
} = clothesSlice.actions;

export default clothesSlice.reducer;
