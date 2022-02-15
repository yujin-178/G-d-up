import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadUsersToFollow } from '../services/api';

const initialState = {
  isOpen: false,
  usersToFollow: ['dd'],
};

export const setUsersToFollow = createAsyncThunk(
  'friends/setUsersToFollow',
  async (userName) => {
    const usersToFollow = await loadUsersToFollow(userName);
    return usersToFollow;
  }
);

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setIsOpen(state, action) {
      return {
        ...state,
        isOpen: action.payload,
      };
    },
  },
  extraReducers: {
    [setUsersToFollow.pending]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [setUsersToFollow.fulfilled]: (state, action) => {
      return {
        ...state,
        usersToFollow: action.payload,
      };
    },
    [setUsersToFollow.rejected]: (state) => {
      return {
        ...state,
        loading: false,
        error: '오류가 발생했습니다.',
      };
    },
  },
});

export const { setIsOpen } = friendsSlice.actions;

export default friendsSlice.reducer;
