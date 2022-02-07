import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './filterSlice';
import clothesSlice from './clothesSlice';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export default configureStore({
    reducer: {
        filterSlice,
        clothesSlice,
    },
    middleware: [thunk, logger],
});
