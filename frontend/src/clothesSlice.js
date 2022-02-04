import { createSlice } from '@reduxjs/toolkit';
import { clothesData } from '../fixtures/clothesList';

const initialState = clothesData;

export const clothesSlice = createSlice({
  name: 'clothesSlice',
  initialState,
  reducers: {
    // todo: clothes add, delete, update
  },
});

export default clothesSlice.reducer;
