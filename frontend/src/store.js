import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './filterSlice';
import clothesSlice from './clothesSlice';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import modalSlice from './modalSlice';

export default configureStore({
  reducer: {
    filterSlice,
    clothesSlice,
    modalSlice,
  },
  middleware: [thunk, logger],
});
