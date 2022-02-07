import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clothesData } from '../fixtures/clothesList';
import { deleteClothes } from './services/api';

const initialState = {
  clothes: clothesData,
  selectedClothes: clothesData[0],
  loading: false,
  error: null,
};

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
});

export const {
  selectClothes,
} = clothesSlice.actions;

export default clothesSlice.reducer;
