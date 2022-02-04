import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './filterSlice';
import clothesSlice from './clothesSlice';

export default configureStore({
    reducer: {
        filterSlice,
        clothesSlice,
    }
});
