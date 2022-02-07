import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './filterSlice';
import clothesSlice from './clothesSlice';
import modalSlice from './modalSlice';

export default configureStore({
    reducer: {
        filterSlice,
        clothesSlice,
				modalSlice,
    }
});
