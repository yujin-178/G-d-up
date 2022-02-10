import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clothesData } from '../../fixtures/clothesList';
import { loadClothesByUserName } from '../services/api';

const initialState = {
  clothes: [],
  selectedClothes: clothesData[0],
  loading: false,
  error: null,
};

export const deleteClothesById = createAsyncThunk(
  'clothes/deleteClothes',
  async (clothesId, thunkAPI) => {
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
  async (userName, thunkAPI) => {
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
  },
  extraReducers: {
    [setClothes.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [setClothes.fulfilled]: (state, action) => {
      return {
        ...state,
        clothes: action.payload,
      };
    },
    [setClothes.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: '오류가 발생했습니다.'
      };
    },
    [deleteClothesById.pending]: (state, action) => {
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
    [deleteClothesById.rejected]: (state, action) => {
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
} = clothesSlice.actions;

export default clothesSlice.reducer;
