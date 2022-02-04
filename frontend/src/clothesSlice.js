import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    'image': 'image1',
    'category': 'top',
    'season': ['summer', 'spring'],
    'colors': ['red', 'blue'],
    'custom': ['daily']
  },
  {
    'image': 'image2',
    'category': 'top',
    'season': ['autumn, winter'],
    'colors': ['white'],
    'custom': ['daily']
  },
  {
    'image': 'image3',
    'category': 'bottom',
    'season': ['summer'],
    'colors': ['black', 'grey'],
    'custom': ['출근']
  },
  {
    'image': 'image4',
    'category': 'outer',
    'season': ['winter'],
    'colors': ['beige', 'yellow'],
    'custom': ['daily']
  },
];

export const clothesSlice = createSlice({
  name: 'clothesSlice',
  initialState,
  reducers: {
    // todo: clothes add, delete, update
  },
});

export default clothesSlice.reducer;
