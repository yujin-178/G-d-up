import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import clothesSlice from './slices/clothesSlice';
import modalSlice from './slices/modalSlice';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export default configureStore({
  reducer: {
    filterSlice,
    clothesSlice,
    modalSlice,
  },
  middleware: [thunk, logger],
});
