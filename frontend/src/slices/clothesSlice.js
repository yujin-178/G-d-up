import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadClothesByUserName, deleteClothes } from '../services/api';

const initialState = {
  userName: '익명',
  clothes: [],
  selectedClothes: null,
  loading: false,
  error: null,
  tagInfo: { 'season': '' },
  imgURL: '',
  tagGroup: [],
  resloading: false,
  imgError: { type: 'background', text: '' },
};

export const deleteClothesById = createAsyncThunk(
  'clothes/deleteClothes',
  async (clothesId) => {
    await deleteClothes(clothesId);
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
    setUserName(state, action) {
      localStorage.setItem("friendName", `${action.payload}`);
      return {
        ...state,
        userName: action.payload,
      };
    },
    selectClothes(state, action) {
      return {
        ...state,
        selectedClothes: action.payload,
      };
    },
    changeTagInfo(state, action) {
      const tags = action.payload.data;
      const tagList = [...state.tagGroup];
      for (let tag in tags) {
        if (tags[tag] !== null) {
          tagList.push(`${tags[tag]}`);
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
    },
    resetClothes(state) {
      return {
        ...state,
        tagInfo: { 'season': '' },
        imgURL: '',
        tagGroup: [],
        imgError: { type: 'background', text: '' },
      };
    },
    changeresloading(state, action) {
      return {
        ...state,
        resloading: action.payload
      };
    },
    changeimgError(state, action) {
      const { type, text } = action.payload;
      return {
        ...state,
        imgError: {
          type,
          text
        }
      };
    },
    setTagGroup(state, action) {
      state.tagGroup = action.payload;
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
      return {
        ...state,
        loading: true
      };
    },
    [deleteClothesById.fulfilled]: (state, { payload }) => {
      console.log('deleted Clothes Id', payload);
      const deleted = state.clothes.filter(item => item.clothing.clothingId !== payload);
      const selectedClothes = deleted.length ? deleted[0] : null;
      return {
        ...state,
        loading: false,
        clothes: deleted,
        selectedClothes: selectedClothes,
      };
    },
    [deleteClothesById.rejected]: (state) => {
      return {
        ...state,
        loading: false,
        error: '오류가 발생했습니다.'
      };
    },
  }
});

export const {
  setUserName,
  selectClothes,
  changeTagInfo,
  setImgURL,
  selectSeason,
  resetClothes,
  changeresloading,
  changeimgError,
  setTagGroup,
} = clothesSlice.actions;

export default clothesSlice.reducer;
