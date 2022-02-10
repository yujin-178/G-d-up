import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clothesData } from '../../fixtures/clothesList';

const initialState = {
  clothes: clothesData,
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

export const clothesSlice = createSlice({
  name: 'clothes',
  initialState,
  reducers: {
    setClothes(state, { clothes }) {
      return {
        ...state,
        clothes,
      };
    },
    selectClothes(state, action) {
      return {
        ...state,
        selectedClothes: action.payload,
      };
    },
  },
  extraReducers: {
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
  setClothes,
  selectClothes,
} = clothesSlice.actions;

export default clothesSlice.reducer;
